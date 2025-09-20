from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorClient
import logging
from datetime import datetime
import os
from ..models.blog_models import ContactMessage, ContactMessageCreate

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])

# Database dependency
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.post("", response_model=dict)
async def submit_contact_message(
    contact_data: ContactMessageCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Submit a contact form message
    
    - **name**: Full name of the person contacting
    - **email**: Valid email address
    - **message**: Message content
    """
    try:
        logger.info(f"Receiving contact message from {contact_data.email}")
        
        # Create contact message object
        contact_message = ContactMessage(
            name=contact_data.name.strip(),
            email=contact_data.email.strip().lower(),
            message=contact_data.message.strip(),
            submittedAt=datetime.utcnow(),
            status="new"
        )
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"Contact message saved with ID: {result.inserted_id}")
            
            return {
                "status": "success",
                "message": "Thank you for your message! I'll get back to you soon.",
                "data": {
                    "messageId": str(result.inserted_id),
                    "submittedAt": contact_message.submittedAt.isoformat()
                }
            }
        else:
            logger.error("Failed to save contact message to database")
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except ValueError as e:
        logger.warning(f"Validation error in contact form: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
        
    except Exception as e:
        logger.error(f"Unexpected error in submit_contact_message: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your message")

@router.get("/messages", response_model=dict)
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    status: str = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get contact messages (admin endpoint)
    
    - **skip**: Number of messages to skip for pagination
    - **limit**: Maximum number of messages to return
    - **status**: Filter by message status (new, read, responded)
    """
    try:
        # Build query filter
        query_filter = {}
        if status:
            query_filter["status"] = status
        
        # Fetch messages
        cursor = db.contact_messages.find(query_filter).sort("submittedAt", -1).skip(skip).limit(limit)
        messages = await cursor.to_list(length=limit)
        
        # Get total count
        total_count = await db.contact_messages.count_documents(query_filter)
        
        # Convert ObjectId to string for JSON serialization
        for message in messages:
            message["_id"] = str(message["_id"])
        
        return {
            "status": "success",
            "data": {
                "messages": messages,
                "totalCount": total_count,
                "skip": skip,
                "limit": limit
            }
        }
        
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

@router.put("/messages/{message_id}/status", response_model=dict)
async def update_message_status(
    message_id: str,
    new_status: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Update the status of a contact message
    
    - **message_id**: ID of the message to update
    - **new_status**: New status (new, read, responded)
    """
    try:
        if new_status not in ["new", "read", "responded"]:
            raise HTTPException(status_code=400, detail="Invalid status value")
        
        from bson import ObjectId
        
        # Update message status
        result = await db.contact_messages.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": {"status": new_status, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {
            "status": "success",
            "message": f"Message status updated to {new_status}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message status")
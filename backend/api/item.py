from fastapi import APIRouter, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session
from utils.database import get_db
from utils.auth import TokenAuthorization
from utils.error_response import send_error_response
from typing import Optional
from sqlalchemy import or_
from models.item import Item
from schemas.item import ItemSchema, ItemResponseSchema
import os
import aiofiles

router = APIRouter()


@router.post('/item')
async def create_item(
    image: UploadFile = File(...),
    name: str = Form(...),
    price: int = Form(...),
    category_id: int = Form(...),
    db: Session = Depends(get_db),
    token: str = Depends(TokenAuthorization)
):
    try:
        MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024  # 2MB
        allowed_content_types = ['image/jpeg', 'image/png', 'image/jpg']
        abs_path = os.path.abspath(__file__)
        dir_name = os.path.dirname(abs_path)
        origin_dir = os.path.join(dir_name, '..', 'uploads')
        os.makedirs(origin_dir, exist_ok=True)

        if image.content_type not in allowed_content_types:
            return send_error_response(
                'Wrong file type, only accept jpeg or png',
                'Wrong file type, only accept jpeg or png'
            )
        if os.fstat(image.file.fileno()).st_size > MAX_FILE_SIZE_BYTES:
            return send_error_response(
                'File too large, only accept file below 2MB',
                'File too large, only accept file below 2MB'
            )

        new_data = Item(
            name=name,
            price=price,
            category_id=category_id
        )
        db.add(new_data)
        db.commit()
        db.refresh(new_data)

        file_extension = image.filename.split('.')[-1]  # type: ignore
        filename = f'{new_data.id}.{file_extension}'
        origin_filepath = os.path.join(origin_dir, filename)

        async with aiofiles.open(origin_filepath, 'wb') as out_file:
            content = await image.read()
            await out_file.write(content)

        new_data.image = filename  # type: ignore
        db.commit()
        new_data.id
        return new_data
    except Exception as error:
        send_error_response(str(error), 'item already exist')


@router.get('/item', response_model=ItemResponseSchema)
def get_item(
    limit: int = 10,
    offset: int = 0,
    search: Optional[str] = None,
    id: Optional[int] = None,
    category_id: Optional[int] = None,
    db: Session = Depends(get_db),
    token: str = Depends(TokenAuthorization)
):
    query = db.query(Item)
    if id:
        query = query.where(Item.id == id)
    if category_id:
        query = query.where(Item.category_id == category_id)
    if search:
        query = query.filter(or_(*[getattr(Item, column).ilike(
            f"%{search}%"
        ) for column in Item.__table__.columns.keys()]  # type: ignore
        ))
    total_data = query.count()
    query = query.offset(offset).limit(limit).all()  # type: ignore
    return {
        "total_data": total_data,
        "data": query
    }


@router.delete('/item/{id}')
def delete_item(id: int, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    try:
        data = db.query(Item).get(id)
        if data:
            db.delete(data)
            db.commit()
    except Exception as error:
        send_error_response(str(error), 'Cannot delete this data')

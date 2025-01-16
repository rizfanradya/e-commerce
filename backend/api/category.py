from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from utils.database import get_db
from utils.auth import TokenAuthorization
from utils.error_response import send_error_response
from typing import Optional
from sqlalchemy import or_
from models.category import Category
from schemas.category import CategorySchema, CategoryResponseSchema

router = APIRouter()


@router.post('/category')
def create_category(category: CategorySchema, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    try:
        new_data = Category(**category.dict())
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        return new_data
    except Exception as error:
        send_error_response(str(error), 'category already exist')


@router.put('/category/{id}')
def update_category(id: int, category: CategorySchema, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    data_info = db.query(Category).get(id)
    if data_info is None:
        send_error_response('Data not found')
    try:
        for key, value in category.dict().items():
            if value is not None:
                setattr(data_info, key, value)
        db.commit()
        db.refresh(data_info)
        return data_info
    except Exception as error:
        send_error_response(str(error), 'category already exist')


@router.get('/category', response_model=CategoryResponseSchema)
def get_category(limit: int = 10, offset: int = 0, search: Optional[str] = None, id: Optional[int] = None, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    query = db.query(Category)
    if id:
        query = query.where(Category.id == id)
    if search:
        query = query.filter(or_(*[getattr(Category, column).ilike(
            f"%{search}%"
        ) for column in Category.__table__.columns.keys()]  # type: ignore
        ))
    total_data = query.count()
    query = query.order_by(Category.id).offset(
        offset).limit(limit).all()  # type: ignore
    return {
        "total_data": total_data,
        "data": query
    }


@router.delete('/category/{id}')
def delete_category(id: int, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    try:
        data = db.query(Category).get(id)
        if data:
            db.delete(data)
            db.commit()
    except Exception as error:
        send_error_response(str(error), 'Cannot delete this data')

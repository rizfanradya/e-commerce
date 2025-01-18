from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from utils.database import get_db
from utils.auth import TokenAuthorization
from utils.error_response import send_error_response
from typing import Optional
from sqlalchemy import or_
from models.cart import Cart
from schemas.cart import CartSchema, CartResponseSchema

router = APIRouter()


@router.post('/cart')
def create_cart(cart: CartSchema, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    try:
        cart_old = db.query(Cart).where(
            Cart.status == False,
            Cart.user_id == cart.user_id,
            Cart.item_id == cart.item_id
        ).first()

        if cart_old:
            cart_old.quantity += cart.quantity
            db.commit()
            return cart_old
        else:
            new_data = Cart(**cart.dict())
            db.add(new_data)
            db.commit()
            db.refresh(new_data)
            return new_data
    except Exception as error:
        send_error_response(str(error), 'cart already exist')


@router.put('/cart/{id}')
def update_cart(id: int, cart: CartSchema, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    data_info = db.query(Cart).get(id)
    if data_info is None:
        send_error_response('Data not found')
    try:
        for key, value in cart.dict().items():
            if value is not None:
                setattr(data_info, key, value)
        db.commit()
        db.refresh(data_info)
        return data_info
    except Exception as error:
        send_error_response(str(error), 'cart already exist')


@router.get('/cart', response_model=CartResponseSchema)
def get_cart(limit: int = 10, offset: int = 0, search: Optional[str] = None, id: Optional[int] = None, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    query = db.query(Cart)
    if id:
        query = query.where(Cart.id == id)
    if search:
        query = query.filter(or_(*[getattr(Cart, column).ilike(
            f"%{search}%"
        ) for column in Cart.__table__.columns.keys()]  # type: ignore
        ))
    total_data = query.count()
    query = query.order_by(Cart.id).offset(
        offset).limit(limit).all()  # type: ignore
    return {
        "total_data": total_data,
        "data": query
    }


@router.delete('/cart/{id}')
def delete_cart(id: int, db: Session = Depends(get_db), token: str = Depends(TokenAuthorization)):
    try:
        data = db.query(Cart).get(id)
        if data:
            db.delete(data)
            db.commit()
    except Exception as error:
        send_error_response(str(error), 'Cannot delete this data')

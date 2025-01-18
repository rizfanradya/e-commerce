from pydantic import BaseModel
from typing import List
from .item import BaseSchema as ItemSchema


class CartSchema(BaseModel):
    user_id: int
    item_id: int
    status: bool
    quantity: int


class BaseSchema(CartSchema):
    id: int
    item: ItemSchema

    class Config:
        from_attributes = True


class CartResponseSchema(BaseModel):
    total_data: int
    total_payment: int
    data: List[BaseSchema]

    class Config:
        from_attributes = True

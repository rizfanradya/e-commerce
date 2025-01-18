from pydantic import BaseModel
from typing import List


class CartSchema(BaseModel):
    user_id: int
    item_id: int
    status: bool
    quantity: int


class BaseSchema(CartSchema):
    id: int

    class Config:
        from_attributes = True


class CartResponseSchema(BaseModel):
    total_data: int
    data: List[BaseSchema]

    class Config:
        from_attributes = True

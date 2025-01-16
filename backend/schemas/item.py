from pydantic import BaseModel
from typing import List


class ItemSchema(BaseModel):
    name: str
    price: int
    image: str


class BaseSchema(ItemSchema):
    id: int

    class Config:
        from_attributes = True


class ItemResponseSchema(BaseModel):
    total_data: int
    data: List[BaseSchema]

    class Config:
        from_attributes = True

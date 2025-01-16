from pydantic import BaseModel
from typing import List


class CategorySchema(BaseModel):
    category: str


class BaseSchema(CategorySchema):
    id: int

    class Config:
        from_attributes = True


class CategoryResponseSchema(BaseModel):
    total_data: int
    data: List[BaseSchema]

    class Config:
        from_attributes = True

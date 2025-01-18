from utils.database import Base
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(Boolean, nullable=False, default=False)
    quantity = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship('User', back_populates='cart')
    item_id = Column(Integer, ForeignKey('item.id'), nullable=False)
    item = relationship('Item', back_populates='cart')

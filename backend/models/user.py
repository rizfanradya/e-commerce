from utils.database import Base
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(length=300), unique=True, nullable=False)
    password = Column(String(length=300), nullable=False)
    role_id = Column(Integer, ForeignKey('role.id'), nullable=False)
    role = relationship('Role', back_populates='user')

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
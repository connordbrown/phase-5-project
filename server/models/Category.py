from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # validation for attributes
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Category must have a title")
        if Category.query.filter(Category.title == title).first():
            raise ValueError(f"Title '{title}' is already taken")
        return title
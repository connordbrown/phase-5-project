from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # object representation
    def __repr__(self):
        return f'<Tag: {self.title}, ID: {self.id}>'
    
    # validation for attributes
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Tag must have a title")
        if Tag.query.filter(Tag.title == title).first():
            raise ValueError(f"Title '{title}' is already in use")
        return title
    
    @validates('timestamp')
    def validate_timestamp(self, key, timestamp):
        if not timestamp:
            raise ValueError("Tag must have a timestamp")
        return timestamp
    
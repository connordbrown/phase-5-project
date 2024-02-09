from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Article(db.Model, SerializerMixin):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # foreign keys to associate articles to a user and a category
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    # object representation
    def __repr__(self):
        return f'<Article: {self.title}, ID: {self.id}>'
    
    # validation for attributes
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Article must have a title")
        return title
    
    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError("Article must have content")
        return content
    
    @validates('timestamp')
    def validate_timestamp(self, key, timestamp):
        if not timestamp:
            raise ValueError("Article must have a timestamp")
        return timestamp
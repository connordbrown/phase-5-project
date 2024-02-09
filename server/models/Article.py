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
    
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise ValueError("Article must have a user ID")
        if not isinstance(user_id, int):
            raise ValueError("User ID must be an integer")
        
        # check if user_id exists in database
        from User import User
        if not User.query.filter(User.id == user_id).first():
            raise ValueError("Article must have an existing user ID")
        
        return user_id
    
    @validates('category_id')
    def validate_category_id(self, key, category_id):
        if not category_id:
            raise ValueError("Article must have a category ID")
        if not isinstance(category_id, int):
            raise ValueError("Category ID must be an integer")
        
        # check if category_id exists in database
        from Category import Category
        if not Category.query.filter(Category.id == category_id).first():
            raise ValueError("Article must have an existing category ID")
        
        return category_id
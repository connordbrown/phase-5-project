from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db
# for association proxy between Category and User
from models.Article import Article

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # relationship mapping category to related articles
    articles = db.relationship('Article', back_populates='category', cascade='all, delete-orphan')

    # rules to prevent recursion error
    serialize_rules = ('-articles.category', '-articles.user',)

    # association proxy to get users who created articles of this category through articles
    article_users = association_proxy('articles', 'user', creator=lambda user_obj: Article(user=user_obj))

    # object representation
    def __repr__(self):
        return f'<Category: {self.title}, ID: {self.id}>'

    # validation for attributes
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Category must have a title")
        if Category.query.filter(Category.title == title).first():
            raise ValueError(f"Title '{title}' is already in use")
        return title
    
    @validates('timestamp')
    def validate_timestamp(self, key, timestamp):
        if not timestamp:
            raise ValueError("Category must have a timestamp")
        return timestamp
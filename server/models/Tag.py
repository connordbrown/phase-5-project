from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db
# for relationship with articles
from models.ArticleTag import article_tags

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String, unique=True, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # relationship mapping the tag to related articles
    articles = db.relationship('Article', secondary=article_tags, back_populates='tags')

    # rules to prevent recursion error
    serialize_rules = ('-articles.tags',)

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
    
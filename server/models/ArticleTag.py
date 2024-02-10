from config import db, metadata

article_tags = db.Table(
    'articles_tags',
    metadata,
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True, nullable=False),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True, nullable=False)
)


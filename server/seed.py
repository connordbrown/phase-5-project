from faker import Faker
from datetime import datetime

from config import app, db

from models.User import User
from models.Category import Category
from models.Article import Article
from models.Tag import Tag

if __name__ == "__main__":
  with app.app_context():
    pass
    # remove pass and write your seed data

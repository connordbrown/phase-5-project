from faker import Faker
from random import choice as rc
from datetime import datetime

from config import app, db

from models.User import User
from models.Category import Category
from models.Article import Article
from models.Tag import Tag

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Category.query.delete()

    # create Faker instance
    fake = Faker()


    ##### User seed data #####
    print("Creating users...")
    users = []
    usernames = []
    emails = []

    for i in range(10):
      # ensure usernames are unique
      username = fake.first_name()
      while username in usernames:
        username = fake.first_name()
      usernames.append(username)

      email = fake.email()
      while email in emails:
        email = fake.email()
      emails.append(email)

      user = User(
        username=username,
        age=fake.random_int(min=10, max=120),
        email=email,
      )
      user.password_hash = user.username + 'password'

      users.append(user)

    db.session.add_all(users)


    ##### Category Seed Data #####
    print("Creating categories...")
    categories = []
    titles = ['Science', 'Technology', 'Music', 'Sports', 'Entertainment', 'Finance', 'Literature', 'Miscellaneous']

    start_date = datetime(2024, 1, 1, 14, 24, 32)
    end_date = datetime(2024, 1, 18, 20, 46, 51)


    for title in titles:
      category = Category(
        title = title,
        timestamp = fake.date_time_between(start_date, end_date)
      )

      categories.append(category)

    db.session.add_all(categories)

    

    db.session.commit()  
    print("Seeding complete")

from faker import Faker
from datetime import datetime
from random import choice

from config import app, db

from models.User import User
from models.Category import Category
from models.ArticleTag import article_tags
from models.Article import Article
from models.Tag import Tag

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Category.query.delete()
    Article.query.delete()
    Tag.query.delete()

    # for deleting article-tag associations
    db.session.query(article_tags).delete()
    db.session.commit()

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


    ##### Article seed data #####
    print("Creating articles...")
    articles = []

    start_date = datetime(2024, 1, 1, 14, 24, 32)
    end_date = datetime(2024, 1, 18, 20, 46, 51)

    for i in range(10):
      title = fake.sentence(nb_words=5)
      content = fake.paragraph(nb_sentences=5)
      timestamp = fake.date_time_between(start_date, end_date)
      user_id = fake.random_int(min=1, max=10)
      category_id = fake.random_int(min=1, max=8)

      article = Article(
        title=title,
        content=content,
        timestamp=timestamp,
        user_id=user_id,
        category_id=category_id
      )

      articles.append(article)


    ##### Tag seed data #####
    print("Creating tags...")
    tags = []

    start_date = datetime(2024, 1, 1, 14, 24, 32)
    end_date = datetime(2024, 1, 18, 20, 46, 51)

    science_tags = ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Physiology']
    technology_tags = ['JavaScript', 'Python', 'C++', 'Rust', 'Go', 'Java', 'Ruby']
    music_tags = ['Jazz', 'Classical', 'Rock', 'Metal', 'Pop', 'Alternative']
    sports_tags = ['Football', 'Soccer', 'Basketball', 'Baseball', 'Rugby', 'Boxing', 'Wrestling']
    entertainment_tags = ['Disney', 'Marvel', 'DC', 'DreamWorks', 'ESPN', 'News']
    finance_tags = ['FinTech', 'Stocks', 'Venture Capital', 'Cryptocurrency', 'Investing', 'Retirement']
    literature_tags = ['Sci-Fi', 'Romance', 'Thriller', 'Mystery', 'Horror', 'Nonfiction']
    miscellaneous_tags = ['Kung-Fu', 'Dogs', 'Cats', 'Memes', 'Travel']

    tag_titles = science_tags + technology_tags + music_tags + sports_tags + entertainment_tags + finance_tags + literature_tags + miscellaneous_tags

    for title in tag_titles:
      tag = Tag(
        title=title,
        timestamp=fake.date_time_between(start_date, end_date)
      )

      tags.append(tag)


    ##### Article-Tag seed data #####
    print("Creating article tags...")

    # add tags to articles - many-to-many relationship
    for article in articles:
      for i in range(2):
        # ensure article tags are unique
        new_tag = choice(tags)
        while new_tag in article.tags:
          new_tag = choice(tags)
        article.tags.append(new_tag)


    # sort articles by date created
    sorted_articles = sorted(articles, key=lambda x: x.timestamp, reverse=True)
    db.session.add_all(sorted_articles)
    
    # sort tags by date created
    sorted_tags = sorted(tags, key=lambda x: x.timestamp, reverse=True)
    db.session.add_all(sorted_tags)


    db.session.commit()  
    print("Seeding complete.")

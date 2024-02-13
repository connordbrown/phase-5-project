from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from config import app, db, api
from models.User import User
from models.Category import Category
from models.ArticleTag import article_tags
from models.Article import Article
from models.Tag import Tag

@app.route('/')
def home():
  return '<h1>Welcome to Articles!</h1>'


##### User Resources #####
class Users(Resource):
  def get(self):
    if users_dict_list := [u.to_dict() for u in User.query.all()]:
      return make_response(users_dict_list, 200)
    return make_response({'error': '404: Users Not Found'}, 404)
  
  def post(self):
    # check that request attributes have values
    for key, val in request.json.items():
      if not val:
        return make_response({'error': f'400: User must have a(n) {key}'}, 400)
      
    username = request.json.get('username')
    # age received as string - must convert to int
    age = int(request.json.get('age'))
    email = request.json.get('email')
    password = request.json.get('password')

    # other input validations
    if not isinstance(age, int):
      return make_response({'error': 'Age must be an integer'}, 400)
    if not (10 <= age <= 120):
      return make_response({'error': 'Age must be between 10 and 120 years'}, 400)
    if '@' not in email or '.' not in email:
      return make_response({'error': 'Invalid email'}, 400)

    new_user = User(
      username=username,
      age=age, 
      email=email
    )

    # password encrypted by setter
    new_user.password_hash = password

    try:
      db.session.add(new_user)
      db.session.commit()
      # get user id with response data
      new_user_data = db.session.get(User, new_user.id)
      return make_response(new_user_data.to_dict(), 201)
    except IntegrityError:
      return make_response({'error': '422: Unprocessable Entity'}, 422)
api.add_resource(Users, '/api/users')


##### Login Resources #####
class Login(Resource):
  def post(self):
    if user := User.query.filter(User.username == request.json.get('username')).first():
      if user.authenticate(request.json.get('password')):
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)
      return make_response({'error': '401 Invalid Password'}, 401)
    return make_response({'error': '401: Invalid Username'}, 401)
api.add_resource(Login, '/api/login')

class Logout(Resource):
  def delete(self):
    if session.get('user_id'):
      session['user_id'] = None
      return make_response({}, 204)
    return make_response({'error': '401: User not logged in'}, 401)
api.add_resource(Logout, '/api/logout')

class CheckSession(Resource):
  def get(self):
    if user := User.query.filter(User.id == session.get('user_id')).first():
      return make_response(user.to_dict(), 200)
    return make_response({'error': '401: User not logged in'}, 401)
api.add_resource(CheckSession, '/api/check_session')


##### Category Resources #####
class Categories(Resource):
  def get(self):
    if categories_dict_list := [c.to_dict() for c in Category.query.all()]:
      return make_response(categories_dict_list, 200)
    return make_response({'error': '404: Categories Not Found'}, 404)
  
  def post(self):
    # user must be logged in to make a Category
    if not session.get('user_id'):
      return make_response({'error': '401: User not logged in'}, 401)
    
    # check that request attributes have values
    for key, val in request.json.items():
      if not val:
        return make_response({'error': f'400: User must have a(n) {key}'}, 400)
      
    title = request.json.get('title')
    timestamp = datetime.now()

    new_category = Category(
      title=title,
      timestamp=timestamp
    )

    try:
      db.session.add(new_category)
      db.session.commit()
      # get category id with response data
      new_category_data = db.session.get(Category, new_category.id)
      return make_response(new_category_data.to_dict(), 201)
    except IntegrityError:
      return make_response({'error': '422: Unprocessable Entity'}, 422)   
api.add_resource(Categories, '/api/categories')


##### Article Resources #####
class Articles(Resource):
  def get(self):
    if article_dict_list := [a.to_dict() for a in Article.query.all()]:
      return make_response(article_dict_list, 200)
    return make_response({'error': '404: Articles Not Found'}, 404)
api.add_resource(Articles, '/api/articles')

class ArticlesByCategory(Resource):
  def post(self, category_id):
    # user must be logged in to create an article
    if not session.get('user_id'):
      return make_response({'error': '401: User not logged in'}, 401)
    
    # check that request attributes have values
    for key, val in request.json.items():
      if not val:
        return make_response({'error': f'400: Article must have a(n) {key}'}, 400)
      
    title = request.json.get('title')
    content = request.json.get('content')
    timestamp = datetime.now()
    # id from logged in user
    user_id = session.get('user_id')
    # ensure correct category_id value by reassigning to current view_arg
    category_id = request.view_args.get('category_id')
    # list of tags
    tags = session.get('tags')

    if not isinstance(user_id, int):
      return make_response({'error': '400: User ID must be an integer'}, 400)
    if not isinstance(category_id, int):
      return make_response({'error': '400: Category ID must be an integer'}, 400)
  
    new_article = Article(
      title=title,
      content=content,
      timestamp=timestamp,
      user_id=user_id,
      category_id=category_id
    )

    # add tags to new_article   #### MAY NEED FIXING
    new_article.tags = []
    for tag in tags:
      new_article.tags.append(tag)

    try:
      db.session.add(new_article)
      db.session.commit()
      # get article id with response data
      new_article_data = db.session.get(Article, new_article.id)
      return make_response(new_article_data.to_dict(), 201)
    except IntegrityError:
      return make_response({'error': '422: Unprocessable Entity'}, 422)
# articles are associated with a specific category
api.add_resource(ArticlesByCategory, '/api/categories/<int:category_id>/articles')

class ArticleByCategory(Resource):
  def patch(self, category_id, article_id):
    # user must be logged in to edit an article
    if not session.get('user_id'):
      return make_response({'error': '401: User not logged in'}, 401)
    
    # check that request attributes have values
    for key, val in request.json.items():
      if not val:
        return make_response({'error': f'400: Article must have a(n) {key}'}, 400)
      
    # check that article exists
    if article := Article.query.filter(Article.category_id == category_id, Article.id == article_id).first():
      # update article attributes
      for attr in request.json:
        setattr(article, attr, request.json.get(attr))
      # ensure correct category_id value by reassigning to current view_arg
      category_id = request.view_args.get('category_id')
      article.category_id = category_id
      # assign new timestamp for edited article
      article.timestamp = datetime.now()
      try:
        db.session.add(article)
        db.session.commit()
        return make_response(article.to_dict(), 200)
      except IntegrityError:
        return make_response({'error': '422: Unprocessable Entity'}, 422)
    return make_response({'error': '404: Article Not Found'}, 404)
  
  def delete(self, category_id, article_id):
    # user must be logged in to delete an article
    if not session.get('user_id'):
      return make_response({'error': '401: User not logged in'}, 401)
    # check that article exists
    if article := Article.query.filter(Article.category_id == category_id, Article.id == article_id).first():
      db.session.delete(article)
      db.session.commit()
      return make_response({}, 204)
    return make_response({'error': '404: Article Not Found'}, 404)
# articles are associated with a specific category  
api.add_resource(ArticleByCategory, '/api/categories/<int:category_id>/articles/<int:article_id>')


##### Tag Resources #####
class Tags(Resource):
  def get(self):
    if tags_dict_list := [t.to_dict() for t in Tag.query.all()]:
      return make_response(tags_dict_list, 200)
    return make_response({'error': '404: Tags Not Found'}, 404)
  
  def post(self):
    # user must be logged in to make a Post
    if not session.get('user_id'):
        return make_response({'error': '401: User not logged in'}, 401)
    
    # check that request attributes have values
    for key, val in request.json.items():
      if not val:
        return make_response({'error': f'400: Article must have a(n) {key}'}, 400)
      
    title = request.json.get('title')
    timestamp = datetime.now()

    new_tag = Tag(
      title=title,
      timestamp=timestamp
    )

    try:
      db.session.add(new_tag)
      db.session.commit()
      # get tag id with response data
      new_tag_data = db.session.get(Tag, new_tag.id)
      return make_response(new_tag_data.to_dict(), 201)
    except IntegrityError:
      return make_response({'error': '422: Unprocessable Entity'}, 422)
api.add_resource(Tags, '/api/tags')

if __name__ == "__main__":
  app.run(port=5555, debug=True)

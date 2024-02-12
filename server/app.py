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
api.add_resource(Categories, '/api/categories')

if __name__ == "__main__":
  app.run(port=5555, debug=True)

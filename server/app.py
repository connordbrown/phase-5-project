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
    username = request.json.get('username')
    # age received as string - must convert to int
    age = int(request.json.get('age'))
    email = request.json.get('email')
    password = request.json.get('password')

    # input validations
    for attribute in [username, age, email, password]:
      if not attribute:
        return make_response({'error': f'400: User must have a(n) {attribute}'}, 400)
      
    if not isinstance(age, int):
      return make_response({'error': 'Age must be an integer'}, 400)
    if not (10 <= age <= 120):
      return make_response({'error': 'Age must be between 10 and 120 years'}, 400)
    if ('@' or '.') not in email:
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

if __name__ == "__main__":
  app.run(port=5555, debug=True)

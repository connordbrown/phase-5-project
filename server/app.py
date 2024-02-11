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
api.add_resource(Users, '/api/users')

if __name__ == "__main__":
  app.run(port=5555, debug=True)

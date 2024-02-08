from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from config import app, db, api
from models.User import User
from models.Category import Category
from models.Article import Article


if __name__ == "__main__":
  app.run(port=5555, debug=True)

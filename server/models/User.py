from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    # object representation
    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'

    # validation for attributes/properties
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("User must have a username")
        if User.query.filter(User.username == username).first():
            raise ValueError(f"Username '{username}' is already taken")
        return username
    
    @validates('age')
    def validate_age(self, key, age):
        if not age:
            raise ValueError("User must have an age")
        if not isinstance(age, int):
            raise ValueError("Age must be an integer")
        if not (10 <= age <= 120):
            raise ValueError("User age must be between ages of 10 and 120 years")
        return age
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("User must have an email")
        if ('@' and '.') not in email:
            raise ValueError("User must have a valid email")
        if User.query.filter(User.email == email).first():
            raise ValueError(f"Email '{email}' is already taken")
        return email
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password access denied")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))    
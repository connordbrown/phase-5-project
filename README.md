# ArticleWriter

ArticleWriter is a Full Stack React-Flask web application for writing articles that have tags and belong to categories!

The back end is a RESTful API that uses a SQLite database to store five tables: users, categories, articles, tags, and article_tags. The database contains two many-to-many relationships: a user has many categories through articles, and an article has many tags through article_tags. It also has four one-to-many relationships: a user has many articles, a category has many articles, an article has many article_tags, and a tag has many article_tags. Currently, the application contains Create and Read methods for users, categories and tags, and full CRUD (Create, Read, Update, and Delete) methods available for articles. The front end makes interaction with the server and database simple and straightforward.

The front end is a React application, created with Vite, that serves as a user-friendly test interface for the back end. It uses Redux for global state management.

## Main Files

**server:**

- *instance* - contains app.db, the SQLite database used to run the API
- *migrations* - contains the Flask migration versions of app.db and associated files
- *app.py* - main server program; contains CRUD methods for the API endpoints for each database model: User, Category, Article, and Tag
- *config.py* - contains configuration for the entire Flask back end
- *models.py* - contains the models, relationships, and validations for each table in app.db
- *seed.py* - clears the database, then seeds it with sample data

**client/src:**

- *main.jsx* - for creating/configuring/rendering App.jsx - includes routing and Redux
- *App.jsx* - main React application
- *index.html* - for creating/rendering React application
- *rootReducer.jsx* - combines Redux slice reducers into one globally-accessible file
- *routes.jsx* - contains all client-side routes

**client/src/pages:**

- *About.jsx* - contains description of the application
- *ArticleInfo.jsx* - displays specific article and update/delete buttons if owned by current user
- *ErrorPage.jsx* - displays error message if user tries to navigate to nonexistent endpoint
- *Home.jsx* - displays list of articles
- *Login.jsx* - displays login or signup form, depending on user's needs
- *Logout.jsx* - displays logout button
- *UserProfile.jsx* - displays info and articles of current user
- *WriteArticle.jsx* - displays form for creating a new article

**client/src/components**

- *ArticleForm.jsx* - allows logged in user to create an article
- *ArticleList.jsx* - displays list of articles
- *ArticleUpdateForm.jsx* - allows logged in user to update an article
- *LoginForm.jsx* - allows existing user to log in
- *LogoutButton.jsx* - allows user to log out
- *NavBar.jsx* - enables navigation between pages/client-side routes
- *SignUpForm.jsx* - allows a user to sign up to use application

**client/src/slices**

- *articleSelectSlice.jsx* - article selected state
- *articlesLoadedSlice.jsx* - articles loading state
- *articlesSlice.jsx* - articles state - contains full CRUD for client
- *categoriesSlice.jsx* - categories state
- *currentUser.jsx* - current user state
- *isLoggedInSlice.jsx* - logged in state
- *tagsSlice.jsx* - tags state
- *usersSlice.jsx* - users state
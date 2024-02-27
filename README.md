# ArticleWriter

ArticleWriter is a Full Stack React-Flask web application for writing articles that have tags and belong to categories!

The back end is a RESTful API that uses a SQLite database to store five tables: users, categories, articles, tags, and article_tags. The database contains two many-to-many relationships: a user has many categories through articles, and an article has many tags through article_tags. It also has four one-to-many relationships: a user has many articles, a category has many articles, an article has many article_tags, and a tag has many article_tags. Currently, the application contains Create and Read methods for users, categories and tags, and full CRUD (Create, Read, Update, and Delete) methods available for articles. The front end makes interaction with the server and database simple and straightforward.

The front end is a React application, created with Vite, that serves as a user interface for the back end. It uses Redux for global state management.

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

**client/src/slices - for use with Redux Toolkit**

- *articleSelectSlice.jsx* - article selected state
- *articlesLoadedSlice.jsx* - articles loading state
- *articlesSlice.jsx* - articles state - contains full CRUD for client
- *categoriesSlice.jsx* - categories state
- *currentUser.jsx* - current user state
- *isLoggedInSlice.jsx* - logged in state
- *tagsSlice.jsx* - tags state
- *usersSlice.jsx* - users state

## Operation

**Back End:**

This application uses Python 3.9. It has dependencies that require a virtual environment. If the virtual environment is not already set up, use the following command:
```bash
pipenv --python 3.9
```

If pipenv is not installed, use this command:
```bash
pip install pipenv
```

Otherwise, install dependencies and run the virtual environment:

```bash
pipenv install
pipenv shell
```

Then, seed the database:
```bash
python server/seed.py
```

Finally, run the server:
```bash
python server/app.py
```

---

**Front End:**

In a separate command line window from the back end, install dependencies:
```bash
npm install
```
Then, run the React app in the browser:
```bash
npm run dev --prefix client
```

## Usage

**Back End:**

The RESTful Flask API contains the following endpoints for http://127.0.0.1:5555:

 - */* - Home
 - */api/users* - Users resource (GET, POST)
 - */api/login* - Login resource (POST)
 - */api/logout* - Logout resource (DELETE)
 - */api/check_session* - Check if user logged in (GET)
 - */api/categories* - Categories resource (GET, POST)
 - */api/articles* - Articles resource (GET, POST)
 - */api/articles/:article_id* - Article resource (PATCH, DELETE)
 - */api/tags* - Tags resource

All ID numbers are integers.

---

**Front End:**

1. Login: 
    - When the application first loads, the user will see the Login page. If new to the app, they can change the login form to a signup form and create an account. Then they can login with their user information.

2. Home:
    - Upon login, the user will see the Home page. It contains: a navigation bar, which allows the user to move between different features and pages, a list of articles, and a search bar for looking up articles by their tags. When a user clicks on one of the articles, the app takes the user to that articles's page.

3. About: 
    - When the user clicks on the About button on the nav bar, the page will display a description of the application.

4. WriteArticle:
    - When the user clicks on the Write button on the nav bar, the page will display a form for creating a new article. Once submitted, the user will be navigated to the article's ArticleInfo page.

4. ArticleInfo: 
    - The page of a specific article. All users can view the specific article. If logged in, users can update or delete their own articles.

5. UserProfile:
    - When the user clicks on the Profile button on the nav bar, the page will display their information, as well as articles they have written. Articles can be navigated to by clicking on them.

5. Logout:
    - A button for logging out the user. The app will return to the login page.

## Contributing

Pull requests are not accepted at this time.

## Authors and Acknowledgement

The original application was designed and built by Connor D. Brown in 2024.
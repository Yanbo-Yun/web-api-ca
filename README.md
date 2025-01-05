# Assignment 2 - Web API.

Name: Yanbo Yun

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
  + New Endpoint: Fetch Popular Movies    
  + New Endpoint: Fetch Movies by Genre
  + Support for Searching Movies by Title
  + Extended TMDB Integration: Fetch Movies by Genre
  + New MongoDB Collection: Reviews
  + New MongoDB Collection: User Collections
 


## API Configuration
+ Clone this repository to your local machine
+ Install dependencies
+ Make sure MongoDB service is running
+ Create a .env file and configure the following variables
______________________
NODEENV=development
PORT=8080
HOST=localhost
mongoDB=myMongoURL
seedDb=true
secret=ilikecake
______________________

## API Design
+ Here are my API Design:
- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/tmdb/popular | GET | Gets a list of popular movies
- /api/movies/genre/:genre | GET | Fetch movies of a specific genre from MongoDB

+ New MongoDB Collection: Reviews:
- /api/reviews/:id |GET| Fetch Reviews
- /api/reviews/:id |POST| Add Review
- /api/reviews/:reviewId |DELETE| Delete Review

+ New MongoDB Collection: User Collections:
- /api/users/collections |GET| Fetch Favorite Movies
- /api/users/collections |POST| Add Movie to Favorites

## Security and Authentication

This project implements the following security and authentication features:

+ JWT Authentication:
- JSON Web Tokens (JWT) are used to authenticate users.
- After logging in, users receive a JWT, which is required to access protected routes.

+ Protected Routes:
The following routes are protected and require authentication:
- /api/movies/:id/reviews (POST, DELETE)
- /api/users/collections (all routes)

+ Login and Register
- Login Endpoint: /api/users/login |POST|
- Signup Endpoint: /api/users/register |POST|


## Integrating with React App

+ Frontend Fetching Data from Backend API:
- MongoDB Collection: Reviews
- MongoDB Collection: User Collections

+ Protected Features:
- Login information is stored as a JWT in the browser and sent as an Authorization header with every request to the backend.


## Independent learning (if relevant)

+ This project also implements the following non-standard features:
- Comment System: Supports user comments, deletion, and management functionality.
- User Favorites Feature: A MongoDB collection was created to store and manage users' favorite movies.
- JWT Authentication: Added user authentication to protect certain routes.

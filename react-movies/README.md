# CA Movie Labs

## Overview

This is a movie browsing application built with React, utilizing the TMDB API to display a list of movies, including upcoming, now playing, and popular movies. Users can explore movie details, reviews, and actor information, as well as add movies to their favorites list.

### Features

- **Movie List**: Display a list of movies from various categories such as popular, now playing, and upcoming.
- **Movie Details**: View detailed information about each movie, including genres, cast, reviews, and more.
- **Movie Recommendations**: Display movie recommendations based on the selected movie.
- **Actor Details**: View detailed information about actors, including their biography and filmography.
- **Pagination**: Implement pagination to show only a limited number of movies per page, making browsing more efficient.

### API Endpoints

The app uses the following additional TMDB API endpoints:
1.Discover list of movies: /discover/movie
2.Movie details: /movie/:id
3.Movie genres: /genre/movie/list
4.Movie recommendations: /movie/:id/recommendations
5.Movie credits (actors, crew): /movie/:id/credits
6.Movie reviews: /movie/:id/reviews
7.Upcoming movies: /movie/upcoming
8.Now playing movies: /movie/now_playing
9.Popular movies: /movie/popular

### Routing

The following routes are supported by the app:
/home: Displays the homepage with a list of popular, now playing, and upcoming movies.
/movie/:id: Displays details of a specific movie.
/favorite: Displays a list of movies added to favorites.

### feeling and learning

Completing this project has been a rewarding experience for me. It allowed me to enhance my skills in React, UI design, and API integration. 
I enjoyed solving problems like building responsive layouts and managing the state of the app. There were challenges along the way, especially when it came to debugging and handling unexpected issues. 
But overcoming them helped me grow as a developer. Seeing the final result and knowing I built something functional from scratch was truly satisfying. 
Overall, this project strengthened my front-end development skills and gave me more confidence in tackling future projects.

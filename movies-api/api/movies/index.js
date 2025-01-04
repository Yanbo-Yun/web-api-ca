import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenresMovies,getPopularMovies,discoverMoviesByGenre} from '../tmdb-api';


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genresMovies = await getGenresMovies();
    res.status(200).json(genresMovies);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/genre/:genre', asyncHandler(async (req, res) => {
    const genre = req.params.genre;
    const movies = await movieModel.find({ genre: genre });
    if (movies.length > 0) {
        res.status(200).json(movies);
    } else {
        res.status(404).json({ message: `No movies found for genre: ${genre}` });
    }
}));

router.get('/search', asyncHandler(async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required.' });
    }
    const movies = await movieModel.find({ title: { $regex: title, $options: 'i' } });
    res.status(200).json(movies);
}));

router.get('/tmdb/discover/:genre', asyncHandler(async (req, res) => {
    const genre = req.params.genre;
    const movies = await discoverMoviesByGenre(genre);
    res.status(200).json(movies);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const recommendations = await fetchRecommendationsFromTMDB(id); 
    res.status(200).json(recommendations);
}));




export default router;
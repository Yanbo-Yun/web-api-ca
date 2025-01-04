import express from 'express';
import asyncHandler from 'express-async-handler';
import reviewModel from './reviewModel';

const router = express.Router();

router.get('/:movieId', asyncHandler(async (req, res) => {
    const movieId = req.params.movieId;
    const reviews = await reviewModel.find({ movieId });
    res.status(200).json(reviews);
}));

router.post('/:movieId', asyncHandler(async (req, res) => {
    const movieId = req.params.movieId;
    const { content, author, rating } = req.body;

    const newReview = new reviewModel({
        movieId,
        content,
        author,
        rating,
    });

    await newReview.save();
    res.status(201).json(newReview);
}));

router.delete('/:reviewId', asyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId;
    await reviewModel.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully.' });
}));

export default router;
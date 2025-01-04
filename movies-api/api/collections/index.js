import express from 'express';
import asyncHandler from 'express-async-handler';
import collectionModel from './collectionModel';

const router = express.Router();


router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const collections = await collectionModel.find({ userId });
    res.status(200).json(collections);
}));


router.post('/', asyncHandler(async (req, res) => {
    const { userId, movieId, movieTitle } = req.body;
    const newCollection = new collectionModel({ userId, movieId, movieTitle });
    await newCollection.save();
    res.status(201).json(newCollection);
}));


router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    await collectionModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Collection deleted successfully.' });
}));

export default router;

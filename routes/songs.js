const express = require('express');
const router = express.Router();

const Song = require('../models/song');

//RESTful endpoints

const getSong = async (req, res, next) => {
    let song
    try {
        song = await Song.findById(req.params.id)
        if (song === null) {
            return res.status(404).json({ message: "Song not recorded" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.song = song;
    next();
}

//GET all
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find()
        res.json(songs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GET one
router.get('/:id', getSong, async (req, res) => {
    res.json(res.song)
})


//CREATE
router.post('/', async (req, res) => {
    const song = new Song ({
        title: req.body.title,
        band: req.body.band
    })
    try {
        const newSong = await song.save();
        res.status(201).json(newSong)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//EDIT
router.patch('/:id', getSong, async (req, res) => {
    if (req.body.title != null){
        res.song.title = req.body.title
    }
    if (req.body.band != null){
        res.song.band = req.body.band
    }
    try {
        const updatedSong = await res.song.save()
        res.json(updatedSong)
    }catch (error){
        res.status(400).json({ message: error.message })
    }
})

//DELETE
router.delete('/:id', getSong, async (req, res) => {
    try {
        await res.song.deleteOne();
        res.json({ message: "Song has been deleted." })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
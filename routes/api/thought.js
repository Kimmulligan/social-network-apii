const express = require('express')
const router = express.Router()
const { getAllThoughts, getThoughtById, createThought, deleteThought, updateThought, createReaction, deleteReaction } = require('../../controllers/thoughtController')
router.get('/', getAllThoughts)
router.get('/:id', getThoughtById)
router.post('/', createThought)
router.put('/:thoughtId', updateThought)
router.delete('/:thoughtId/delete/:userId', deleteThought)
router.post('/:thoughtId/reactions', createReaction)
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction)
module.exports = router
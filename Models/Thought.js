const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    get: (v) => {
      return `${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}`;
    },
  },
});
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    get: (v) => {
      return `${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}`;
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema]
});


ThoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length
})
 const Thought = mongoose.model('Thought', ThoughtSchema)

 module.exports = Thought


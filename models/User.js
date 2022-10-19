const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, required: true}
  },
  {
    id: false,
  }
);
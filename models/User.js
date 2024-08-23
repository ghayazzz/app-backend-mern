// const mongoose = require('mongoose');
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');

// const FileSchema = new mongoose.Schema({
//   lasFilename: { type: String, required: true },
//   // Other fields if necessary
// });

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   savedFiles: [FileSchema], // Array to store saved files
// });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedFiles: [{ type: String }]  // Array to store filenames
});

module.exports = mongoose.model('User', UserSchema);

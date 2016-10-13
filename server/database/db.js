// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');
// var config = require('../config.js');
// var userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         select: false
//     },
//     displayName: String,
//     picture: String,
//     bitbucket: String,
//     facebook: String,
//     foursquare: String,
//     google: String,
//     github: String,
//     instagram: String,
//     linkedin: String,
//     live: String,
//     yahoo: String,
//     twitter: String,
//     twitch: String,
//     spotify: String
//
// });
// userSchema.pre('save', function(next) {
//     var user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// userSchema.methods.comparePassword = function(password, done) {
//     bcrypt.compare(password, this.password, function(err, isMatch) {
//         done(err, isMatch);
//     });
// };
// var User = mongoose.model('User', userSchema);
// exports.User = User;
//
// var project = mongoose.Schema({
//     projectName: {
//         type: String,
//         required: true
//     },
//     key: {
//         type: String,
//         required: true
//     },
//     //  password:{type:String,required:true}
// });
//
//
// var project = mongoose.model('project', project);
// exports.project = project;
//
// var Database = mongoose.Schema({
//     projectKey: {
//         type: String,
//         required: true
//     },
//     data: {
//         type: Object,
//         required: true,
//     },
//
// });
//
// var Database = mongoose.model('Database', Database);
// exports. Database =  Database;

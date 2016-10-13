'use strict';
/**
 * define require modules
 */
// let mongoose = require('mongoose'),
//     state = {
//         db: null,
//     },
//     url = process.env.MONGO_URI || 'mongodb://localhost:27017/bridgedb';
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var state = {
        db: null,
    }
    // Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bridgedb'
    /**

     * @exports {connect,close}
     */
exports.connect = function(done) {


    // console.log("db before connect ");
    // console.log(state.db);
    if (state.db) return done(null, state.db)

    MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log("error in connection "+err);
            return done(err, null)
        }

        state.db = db
        // console.log(state.db);
        done(null, state.db)
    })
}

exports.getDb = function() {
    return state.db
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            //state.mode = null
            done(err)
        })
    }
}

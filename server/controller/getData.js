var express = require('express'),
    router = express.Router();
var db = require('../database/db');

router.post('/', function(req, res) {
    var projectKey = req.body.key;
    console.log("getdata key "+projectKey);
    db.Database.findOne({
        projectKey: projectKey
    }, function(err, jsonOfDb) {
        //if project has already some data then override it
        if (err) {
            res.send('Error');
            //console.log(err);
        } else {
            console.log("json obj "+jsonOfDb.data);
            res.send(jsonOfDb);
        }
    });
});
module.exports = router;

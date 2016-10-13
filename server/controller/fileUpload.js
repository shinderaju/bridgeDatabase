var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var multiparty = require('multiparty');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');
var multiparty = require('multiparty');
var fs = require('fs');
var db = require('../database/db');

router.post('/', function(req, res) {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

        var data = fields;
        var name = data.key;
        var fname = files.file[0].originalFilename;
        var fpath = files.file[0].path;

        jsonfile.readFile(fpath, function(err, obj) {
            if (err) {
                console.log("Invalid JSON File");
                res.send("Invalid JSON File");
            } else {

                var filedata = obj;
                db.Database.findOne({
                    projectKey: data.key[0]
                }, function(err, jsonOfDb) {
                  //if project has already some data then override it
                    if (jsonOfDb) {
                        //override data
                        jsonOfDb.projectKey = data.key[0];
                        jsonOfDb.data = obj;
                        jsonOfDb.save();
                        res.send("JSON saved successfully")

                    } else {
                        //save data directly
                        var jsonData = new db.Database({
                            projectKey: data.key[0],

                            data: filedata
                                //  data: obj.toString()
                        });
                        jsonData.save(function(err, result) {
                            if (err) {
                                res.status(500).send({
                                    message: err.message
                                });
                            } else {
                                db.Database.findOne({
                                    projectKey: data.key[0]
                                }, function(err, existingUser) {
                                    res.send("JSON saved successfully");
                                });
                            }
                        });
                    }
                })
            }

        }); //end of jsonfile.readFile()
    }); //end of form.parse()
}); //end of post


module.exports = router;

var express = require('express'),
    router = express.Router();

router.use('/fileUpload',require('./fileUpload.js'));
router.use('/api',require('./api.js'));
router.use('/auth',require('./loginEmail.js'));
router.use('/project',require('./project.js'));
router.use('/retrive',require('./retrive.js'));
router.use('/getData',require('./getData.js'));

router.get('/home', function(req, res) {
    console.log("inside function");
    res.send('Home Screen');
})
module.exports = router;

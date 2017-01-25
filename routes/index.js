var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/getJson', function(req, res) {
    return controller.getJson(req, res);
} );

router.get('/api/category', function(req, res) {
    console.log("router: getting all categories");
    return controller.getAllCategories(req, res);
} );

router.get('/api/category/:id', function(req, res) {
    console.log("router: getting one category");
    return controller.getOneCategory(req, res);
} );

router.get('/api/subcategory/:id',function (req, res) {
    console.log("router: getting sub category");
    return controller.getSubcategory(req,res);
});

module.exports = router;

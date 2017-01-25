/**
 * Created by Wang Jun on 24/1/2017.
 */
var http = require("http");
var https = require("https");
var mongoose = require("mongoose");
var dataModel = require("./../models/datamodel.js");
var url = "https://api.foursquare.com/v2/venues/categories?oauth_token=Z3OKVW343I2ADUT54B0DU22S3YFP5AMRDNPSXUPZK3F04EV5&v=20160804";


exports.getJson = function (req, res) {
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var jsondata = JSON.parse(body);
            console.log("Got json response: ");
            jsondata.response.categories.forEach(function (item) {
                var newIcon = new dataModel.icon({
                    prefix: item.icon.prefix,
                    suffix: item.icon.suffix,
                });
                newIcon.save();
                var newEntry = new dataModel.categories({
                    id: item.id,
                    name: item.name,
                    pluralName: item.pluralName,
                    shortName: item.shortName,
                    icon: newIcon,
                    categories: item.categories,
                });
                newEntry.save();
            });
            // allCategories = jsondata.response.categories;
            // allCategories.forEach( function(item) {
            //       console.log(item.name);
            //  })

        })
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
};


exports.getAllCategories = function (req, res) {
    console.log("getting all categories");

    var query = dataModel.categories.find().select('name -_id');
    query.exec(function (err, results) {
        if (err) {
            console.log("Got an error in getAllCategories:" + err);
            return;
        }
        res.json(200, results);
    });

    //redirect to home page
    //res.redirect(301, '/');
};


exports.getOneCategory = function (req, res) {
    //ObjectId("58870094abe0382860824ec5")
    var id= req.params.id;
    console.log("getting One category for " + id);
    var query = dataModel.categories.findById(id);
    query.exec(function (err, results) {
        if (err) {
            console.log("Got an error in getAllCategories:"+err);
            return;
        }
        if (results == null) {
            console.log("Query returned Null ");
        }
        res.json(200, results);
    });


    //redirect to home page
    //res.redirect(301, '/');
};

exports.getSubcategory = function (req, res) {
    //test id 52f2ab2ebcbc57f1066b8b3b
    var id = req.params.id;
    console.log("getting subcategory... for " + id);
    var query = dataModel.categories.find();
    query.exec(function (err, results) {
        if (err) {
            console.log("Got an error in getSubCategories:" + err);
            return;
        }
        var subcategory;
        results.forEach( function(item) {
           item.categories.forEach( function(subItem) {
               if (subItem.id == id)
                   subcategory = subItem;
           })
        });
        res.json(200, subcategory);
    });
};

/*
 exports.getAllCategories = function (req, res) {
 console.log("Getting all categories...")
 allCategories.forEach( function(item) {
 console.log(item.name);
 });
 //redirect to home page
 res.redirect(301, '/');
 };

 exports.getOneCategory = function (req, res) {
 var id;
 console.log("Getting the categories for id " + id)
 allCategories.forEach( function(item) {
 if (item.id == id)
 console.log("found category id " + id);
 });
 //redirect to home page
 res.redirect(301, '/');
 };

 exports.getSubCategory = function (req, res) {
 console.log("Getting the categories for id " + req.get())

 allCategories.forEach( function(item) {
 item.categories.forEach(function(subcategory){
 if (subcategory.id == id)
 console.log("found subcategory id " + id);
 //then
 })

 });
 //redirect to home page
 res.redirect(301, '/');
 };

 */
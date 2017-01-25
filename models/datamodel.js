/**
 * Created by Wang Jun on 24/1/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iconSchema = new Schema({
    prefix: String,
    suffix: String
});

var categoriesSchema = new Schema({
    id: String,
    name: String,
    pluralName: String,
    shortName: String,
    icon: iconSchema,
    categories: []
});

module.exports = {
    categories: mongoose.model('categories', categoriesSchema),
    icon: mongoose.model('icon', iconSchema)
};



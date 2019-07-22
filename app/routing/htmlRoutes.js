const friends = require('../data/friends.js');


module.exports = {};

module.exports.homeRoute = (app) => {
    app.get('/', (req, res) => {
        res.render('home', {title: "Mongo Scraper", subtitle: "New York Times Edition", home_current: true});
    });
};

module.exports.savedRoute = (app) => {
    app.get('/saved', (req, res) => {
        res.render('saved', {title: "Saved Articles", subtitle: "Saved Articles", home_current: false});
    });
};
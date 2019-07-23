// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("../models");


module.exports = {};

module.exports.getHeadlinesRoute = (app) => {
    app.get('/api/headlines', (req, res) => {
        const data = req.query;
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        db.Article.find({ saved: data.saved })
        .then(function(dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
    app.put('/api/headlines/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        db.Article.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(function(dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
    app.delete('/api/headlines/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        db.Article.remove({ _id: req.params.id })
        .then(function(dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
};

module.exports.getClearRoute = (app) => {
    app.get('/api/clear', (req, res) => {
        const data = req.query;
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        db.Article.deleteMany({})
        .then(function(dbArticle) {
          // If we were able to successfully find Articles, send them back to the client
          res.json("Success");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
};

module.exports.getFetchRoute = (app) => {
    app.get('/api/fetch', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        // First, we grab the body of the html with axios
        axios.get("https://www.theonion.com/").then(function (response) {

            db.Article.find({})
                .then(function (dbArticle) {
                    // Then, we load that into cheerio and save it to $ for a shorthand selector
                    var $ = cheerio.load(response.data);

                    // Now, we grab every h2 within an article tag, and do the following:
                    $("article h1").each(function (i, element) {
                        // Save an empty result object
                        var result = {};

                        // Add the text and href of every link, and save them as properties of the result object
                        result.title = $(this)
                            .parent("a")
                            .text();
                        result.link = $(this)
                            .parent("a")
                            .attr("href");
                        result.saved = false;

                        // Create a new Article using the `result` object built from scraping
                        console.log(`title: ${result.title}, link: ${result.link}`);
                        // Create a new Article using the `result` object built from scraping

                        for (let article of dbArticle) {
                            if (article.title === result.title) {
                                return;
                            }
                        }

                        db.Article.create(result)
                            .then(function (dbArticle) {
                                // View the added result in the console
                                console.log(dbArticle);
                            })
                            .catch(function (err) {
                                // If an error occurred, log it
                                console.log(err);
                            });
                    });

                    // Send a message to the client
                    res.send("Scrape Complete");
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        });
    });
};

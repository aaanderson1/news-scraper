const friends = require('../data/friends.js');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = {};

module.exports.getHeadlinesRoute = (app) => {
    app.get('/api/headlines', (req, res) => {
        const data = req.query;
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        const headlines = [{
            headline: "text",
            url: "google.com",
            summary: "blah",
            _id: 0
        }];
        res.end(JSON.stringify(headlines));
    });
};

module.exports.getFetchRoute = (app) => {
    app.get('/api/fetch', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        // First, we grab the body of the html with axios
        axios.get("https://www.theonion.com/").then(function (response) {
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

                // Create a new Article using the `result` object built from scraping
console.log(`title: ${result.title}, link: ${result.link}`);
            });

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });
};

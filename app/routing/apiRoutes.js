const friends = require('../data/friends.js');


module.exports = {};

module.exports.getHeadlinesRoute = (app) => {
    app.get('/api/headlines', (req, res) => {
        const data = req.query;
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        const headlines = [
            {
                headline: "text", 
                url: "google.com",
                summary: "blah",
                _id: 0
            }
        ];
        res.end(JSON.stringify(headlines));
    });
};

module.exports.getFetchRoute = (app) => {
    app.get('/api/fetch', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(""));
    });
};


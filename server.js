const htmlRoutes = require('./app/routing/htmlRoutes.js');
const apiRoutes = require('./app/routing/apiRoutes.js');

const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
//connect handlebars to express app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

htmlRoutes.homeRoute(app);
htmlRoutes.savedRoute(app);
apiRoutes.getHeadlinesRoute(app);
apiRoutes.getFetchRoute(app);
app.listen(PORT);

// //if deployed use the deployed database, otherwise use the local mongoHeadlines database
// var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// //connect mongoose to our database
// mongoose.connect(db, function(error){
//     //log any errors connecting with mongoose
//     if (error) {
//         console.log(error);
//     }
//     //or log a success message
//     else {
//         console.log("mongoose connection is successful");
//     }
// });
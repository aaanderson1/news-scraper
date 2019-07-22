const htmlRoutes = require('./app/routing/htmlRoutes.js');
const apiRoutes = require('./app/routing/apiRoutes.js');

const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

htmlRoutes.homeRoute(app);
htmlRoutes.savedRoute(app);
apiRoutes.getHeadlinesRoute(app);
apiRoutes.getFetchRoute(app);
app.listen(PORT);
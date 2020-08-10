const express = require('express');
const path = require('path');
const hbs = require('hbs');
const web = require('../routes/web');
const AdminRouter=require('./routers/admin');

// require('./db/mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const busboy = require("connect-busboy");

const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
var myParser = require("body-parser");
const { body, validationResult } = require('express-validator');

const app = express();
app.use(myParser.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(__dirname + '/views/partials');

// app.use(express.static("../public"));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{res.render('index')});
app.get('/signup',(req,res)=>{res.render('signup')});


//app.use(express.static(path.join(__dirname, '../public')));
//hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static("../public"));
hbs.registerPartials("./views/partials");

app.use(busboy());
app.use('/', web);
//=============================================
//session for user login
app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2'],
	maxAge:  3600 * 1000 // 1hr
}));
app.use('/session', session);


app.use(AdminRouter)  ;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cors());
app.use(cookieParser());
app.use(function(req, res, next) {
	if (req.headers['content-type'] === 'application/json;') {
		req.headers['content-type'] = 'application/json';
	}
	next();
});
app.use(busboy());

const port=process.env.PORT || 1337;

app.listen(port, () => {
	console.log('serving on port 1337');
});
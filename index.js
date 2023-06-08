const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {engine} = require('express-handlebars');
const helpers = require('handlebars-helpers')();

const {sequelize} = require('./database/db');
sequelize.sync({force: false});







// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// static files
app.use(express.static('public'));

// handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    helpers
}));
app.set('view engine', 'hbs');
// handlebars helpers




// routes
app.use('/', require('./routes/home'))

// register user
app.use('/register', require('./routes/register'));
// verify email
app.use('/verify', require('./routes/verify'));
// login user
app.use('/login', require('./routes/login'));
// reset password
app.use('/reset', require('./routes/reset/reset'));
// enter email for reset password
app.use('/enter-email', require('./routes/reset/enterEmail'));
// enter code for reset password
app.use('/enter-code', require('./routes/reset/enterCode'));
// new password
app.use('/new-password', require('./routes/reset/newPassword'));
// dashboard
app.use('/dashboard', require('./routes/dashboard'));
// logout
app.use('/logout', require('./routes/logout'));


// courses
app.use('/courses', require('./routes/courses'));
// lessons
app.use('/lessons', require('./routes/lessons'));
// course details
app.use('/course-details', require('./routes/courseDetails'));
// news
app.use('/news', require('./routes/news'));
// contact
app.use('/contact', require('./routes/contact'));


// admin
app.use('/admin', require('./routes/admin/main'));



// 404 error not found
app.use((req, res) => {
    res.render('pages/errors/404', {
        title: 'Sahifa topilmadi',
        registered: req.cookies.token ? true : false
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port '+PORT+' ...');
    sequelize.authenticate()
        .then(() => {
            console.log('Connected to database');
        })
        .catch(err => {
            console.log('Unable to connect to database', err);
        });
})

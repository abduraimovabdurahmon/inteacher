const {Router} = require('express');
const router = Router();
const { adminController } = require('../../controllers/mainControllers');
require('dotenv').config();


router.get('/', adminController, (req, res) => {
    res.render('pages/admin/main', {
        title: "Admin",
        registered: req.cookies.token ? true : false,
        url: process.env.mainURL+'/src/dashboard',
    });
});

router.use('/courses', require('./courses/main'));


module.exports = router;
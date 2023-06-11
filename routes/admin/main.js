const {Router} = require('express');
const router = Router();
const { adminController } = require('../../controllers/mainControllers');
require('dotenv').config();
const getUser = require('../../utils/getUser');


router.get('/', adminController, async (req, res) => {
    


    res.render('pages/admin/main', {
        title: "Admin",
        registered: req.cookies.token ? true : false,
        url: process.env.mainURL+'/src/dashboard',
        data: {
            user: await getUser(req.cookies.token)
        }
    });
});

router.use('/courses', require('./courses/main'));

router.use('/teachers', require('./teachers/main'));


module.exports = router;
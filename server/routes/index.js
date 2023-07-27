const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController');
const authentication = require('../middleware/authentication');
const errorHandling = require('../middleware/errorHandling');
const multer = require('../middleware/multer');
const comicController = require('../controllers/comicController');

// multer.single('image'),

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/glogin', UserController.gLogin);
router.post('/github-login', UserController.githubLogin);

router.get('/profile', authentication, UserController.fetchProfile)
router.put('/profile', authentication, UserController.editProfile)
router.delete('/profile', authentication, UserController.deleteProfile)


router.get('/', comicController.fetchComics)
router.post('/donate', authentication, comicController.midTrans)
router.get('/favorite', authentication, comicController.fetchFavorite)
router.post('/favorite/:id', authentication, comicController.addFavorite)
router.get('/detail/:slug', comicController.fetchComicsDetail)
router.use(errorHandling)
module.exports = router
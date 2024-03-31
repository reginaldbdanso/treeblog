const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController');

//require authentication for all routes
router.use(requireAuth);

// GET all Blogs
router.get('/', getBlogs)

//GET a single Blog
router.get('/:id', getBlog)

//POST a new Blog
router.post('/', createBlog)

//DELETE a Blog
router.delete('/:id', deleteBlog)

// UPDATE a Blog
router.patch('/:id', updateBlog)

module.exports = router
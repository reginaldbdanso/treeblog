const Blog = require('../models/blogSchema');
const mongoose = require('mongoose');

// GET all Blogs
const getBlogs = async (req, res) => {
    const blog = await Blog.find().sort({createdAt: -1});
    res.status(200).json(blog);
}

// GET all Blogs by a user
const getUserBlogs = async (req, res) => {
    const user_id = req.user._id;
    const blog = await Blog.find({user_id}).sort({createdAt: -1});
    res.status(200).json(blog);
}

// GET a single Blog
const getBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Blog not found'});
    }
    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({error: 'Blog not found'})
    }
    res.status(200).json(blog);
}


//POST a new Blog
const createBlog = async (req, res) => {
    const {title, body, author} = req.body;

    // detect which fields are empty
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title')
    }
    if (!body) {
        emptyFields.push('body')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    // add new doc to collection
    try {
        const user_id = req.user._id;
        const blog = await Blog.create({title, body, author, user_id})
        res.status(201).json(blog)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//DELETE a Blog
const deleteBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Blog not found'});
    }
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
        return res.status(404).json({error: 'Blog not found'})
    }
    res.status(200).json(blog);
}

// UPDATE a Blog
const updateBlog = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Blog not found'});
    }
    const blog = await Blog.findByIdAndUpdate(id, {...req.body});

    if (!blog) {
        return res.status(404).json({error: 'Blog not found'})
    }
    res.status(200).json(blog);
}


module.exports = {
    createBlog,
    getBlogs,
    getUserBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}
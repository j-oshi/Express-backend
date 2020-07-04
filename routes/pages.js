const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const verify = require('./verifyToken');

router.get('/', verify, (req, res, next) => {
    // res.send([1, 2, 3]);
    res.send(req.user);
    // User.findByOne({_id: req.user});
});

router.post('/', (req,res) => {
    const page = new Page({
        title: req.body.title,
        type: req.body.type,
        slug: req.body.slug,
        tags: req.body.tags,
        description: req.body.description
    });

    page.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });
});

router.delete('/:pageId', async (req, res) => {
    try {
       const removePage = await Page.remove({_id: req.params.pageId});
       res.json(removePage);
    } catch(err) {
        res.json({ message: err });
    }   
});

router.patch('/:pageId', async (req, res) => {
    try {
       const updatePage = await Page.updateOne({_id: req.params.pageId}, { $set: {description: req.body.description }});
       res.json(updatePage);
    } catch(err) {
        res.json({ message: err });
    }   
});

module.exports = router;
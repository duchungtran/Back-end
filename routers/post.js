const router = require('express').Router();
const Post = require('../models/Post');
const express = require('express');

router.get('/', async (req, res) => {
    try {
        var result = await Post.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.json({message: err});
    }
});

router.get('/:postId', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err){
        res.json({message: err});
    }
    
});

router.delete('/:postId', async (req,res)=>{
    try{
       const removePost = await Post.remove({_id: req.params.postId})
       res.json(removePost)
    }catch (err){
        res.json({message: err})
    }
})

router.put('/:postId', async (req,res)=>{
    try{
        const updatedPost = await Post.updateOne({_id: req.params.postId},
            {$set:req.body});
        res.json(updatedPost);
    }catch(err){
        res.json({message: err})
    }
})
module.exports = router
/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

var mongoose = require('mongoose');
var postdata = require('../model/posts');
// GET

exports.posts = function (req, res) {

  postdata.allposts(function(err, dbposts){
    res.json({ posts: dbposts });
  });

};

exports.post = function (req, res) {
  var id = req.params.id;

  //console.log('route/api/post/id: ' + id);

  postdata.findbyid(id, function(err, dbpost){
    //console.log('route/api/post/dbpost: ' + dbpost);

      res.json({ post: dbpost });
  });

};

// POST

exports.addPost = function (req, res) {

  // Use the Post2 schema to add new record. This lets the database create the _id.
  // If you use the other schema (Post) you are required to create the _id before
  // the save.
  var Post = mongoose.model('Post2');
  var newPost = new Post();
  newPost.title = req.body.title;
  newPost.text = req.body.text;

  //console.log('New Post Data: ' + newPost);

  postdata.addPost(newPost, function(err, dbpost){
      if (err)
        res.json(false);
      else {
        //res.json(true);
        res.json(req.body);
      }
    });

  //data.posts.push(req.body);
  //res.json(req.body);
};

// PUT

exports.editPost = function (req, res) {
  var id = req.params.id;

  //console.log('route/api/editPost/id: ' + id);
  //console.log('route/api/editPost/post: ' + req.body.text);

 var editedPost = mongoose.model('Post');
 editedPost._id = id;
 editedPost.title = req.body.title;
 editedPost.text = req.body.text;

 //console.log('route/api/editPost/id: ' + editedPost._id);
 //console.log('route/api/editPost/title: ' + editedPost.title);
 //console.log('route/api/editPost/text: ' + editedPost.text);

  postdata.savePostById(editedPost, function(err, dbpost){
    if (err)
      res.json(false);
    else
      res.json(true);
  });
  
};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;

  postdata.deletePost(id, function(err, retId){
      if (err)
        res.json(false);
      else
        res.json(true);
    });
};
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var postSchema = new mongoose.Schema({
	_id: ObjectId,
	title: String,
	text: String
},
{
	collection: 'posts'
});

var postSchema2 = new Schema({
	title: String,
	text: String
},
{
	collection: 'posts'
});

mongoose.model('Post', postSchema);
mongoose.model('Post2', postSchema2);
mongoose.connect('mongodb://localhost/blogdb');

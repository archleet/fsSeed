db = db.getSiblingDB('blogdb');

db.posts.save({title:"Post 1", text: "Post 1 body"});
db.posts.save({title:"Post 2", text: "Post 2 body"});
db.posts.save({title:"Post 3", text: "Post 3 body"});
db.posts.save({title:"Post 4", text: "Post 4 body"});
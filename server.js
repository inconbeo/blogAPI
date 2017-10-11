'use strict';
const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const {BlogPosts} = require('./model');

BlogPosts.create('title1', 'content1', 'author1');
BlogPosts.create('title2', 'content2', 'author2');
BlogPosts.create('title3', 'content3', 'author3');

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});




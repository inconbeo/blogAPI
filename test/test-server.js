'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, CloseServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

before(function() {
  return runServer;
});
  
after(function() {
  return closeServer;
});


describe('BlogPosts', function() {
    it('should list blog posts in GET', function() {
        return chai.response(app)
        .get('/blog-posts')
        .then(function(res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            console.log(res.body);
            res.body.length.should.be.above(0);
            const expectedkeys = ['title', 'content', 'author'];
            res.body.array.forEach(function(item) {
                item.should.be.a('object');
                item.should.include.keys(expectedkeys);
            })
        })
})

    it('should add a blog post on POST', function() {
        const newBlog = {
            title: 'x', content: 'y', author: 'z'
        }
        return chai.response.request(app)
            .post('blog-posts')
            .send(newBlog);
            .then(function(res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('title', 'content', 'author');
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(newBlog, {id: res.body.id}));

            })
    });

    it('should update items on PUT', function() {
        const updateBlog = {
            title: 'title1', content: 'content1', author: 'author1'
        };
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                updateBlog.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updateBlog.id}`)
                    .send(updateBlog);
            })
            .then(function(res) {
                res.should.have.status(204);
                //optional step to see the updated list
                return chai.request(app)
                    .get('/blog-posts')
                    .then(function(res) {
                        console.log(res)
                    })
            })
    })

    it('should delete blog on DELETE', function() {
        return chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function(res) {
                res.should.have.status(204);
            })
    })
})

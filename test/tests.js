const request = require('supertest');
const app = require('../Server/server.js');
const User = require('../Server/db/models/User.js')
const Post = require('../Server/db/models/Post.js');
const Comments = require('../Server/db/models/Comment.js');
const Follow = require('../Server/db/models/Follow.js');

beforeAll(() => { 
    User.drop();
    Post.drop();
    Comments.drop();
    User.create({
        uid: 'asdfzxv2',
        handle: 'testuser'
    });
    User.create({
        uid: 'asdfzxv3',
        handle: 'testuser2'
    })
});


describe('Test if get request to showExplorePage is valid' () => {
    test('Should return a response with posts from all users', (done) => {
        request(app)
        .get('/showExplorePage')
        .then(response => {
            expect(response.body)
            done();
        })
    })
})

describe('Test to submit a post' () => {
    test('Should add a post to the database', (done) => {
        const post = {
            uid: 'asdfzxv2',
            caption: 'Some caption',
            postUrl: 'https://cdn.filestackcontent.com/resize=width:600,height:600,fit:crop/4sgpDJxSUWExFKFg7TsO',
            mediaType: 'image'
        }
        request(app).post('/submitPost').send(post).then(response => {
            expect(response.body.caption).toBe('Some caption');
            done();
        })
    })
})

describe('Test to add a comment to a post' () => {
    test('Should add a comment to a post', (done) => {
        const comment = {
            uid:'asdfzxv2',
            postId: 1,
            comment: 'Some comment',
        }
        request(app).post('/addComment').send(comment).then(response => {
            expect(response.body.comment).toBe('Some comment');
            done();
        })
    })
})

describe('Test to follow other users' () => {
    test('Should be able to send a follow request to other users', (done) => {
        const follow = {
            userUid: 'asdfzxv2',
            targetUserUid: 'asdfzxv3'
        }
        request(app).post('/requestFollow').send(follow).then(response => {
            const result = Follow.findAll({
                where: {
                  userId,
                  targetId,
                },
              });
              result();
            expect(result.length).toBe(1);
        })
    })
})
// test/blog.test.js
const request = require('supertest');
const app = require('../src/app');
const { sequelize, Blog } = require('../src/models');

describe('Blog API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog post', async () => {
      const res = await request(app)
        .post('/api/blogs')
        .send({ title: 'Test Blog', content: 'This is a test blog post.' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Test Blog');
      expect(res.body.content).toEqual('This is a test blog post.');
    });
  });
});

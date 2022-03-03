const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

jest.setTimeout(300000)

describe('blogs tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()  
  }) 
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  }, 100000)
  
  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('there is an unique identifier called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  
  test('a valid blog has been added', async () => {
    const newBlog = {
      title: 'La Malediction',
      author: 'Ataraxia',
      url: 'www.ataraxia.com',
      likes: 43 
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(r => r.author)
    expect(contents).toContain('Sigh')
  })
  
  test('like property is missing, default to the value of 0', async () => {
    const newBlog = {
      title: 'Where Lovers Mourn ',
      author: 'Draconian',
      url: 'www.draconian.com', 
    }
  
    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
  
    console.log(blogsAtEnd)
    expect(lastBlog.likes).toBe(0)
  
  })
  
  test('title and url are missing, server responds with error 400', async () => {
    const newBlog = {
      author: 'Thundercat',
      likes: 444
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogsAtStart)
    console.log(blogToDelete.id)
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const contents = blogsAtEnd.map(r => r.content)
  
    expect(contents).not.toContain(blogToDelete.author)
  })
  
  test('update of a blog succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes +1,
      id: blogToUpdate.id
    }
  
    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogAtEnd = blogsAtEnd.find(blog => blog.id === updatedBlog.id)
  
    expect(updatedBlogAtEnd.likes).toBe(updatedBlog.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})

//npm test -- tests/blog_api.test.js
// npm test -- -t 'when there is initially one user in db'
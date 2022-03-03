const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Hail Horror Hail',
    author: 'Sigh',
    url: 'www.sigh.com',
    likes: 22
  },
  {
    title: 'Till Fjälls',
    author: 'Vintersorg',
    url: 'www.vintersorg.com',
    likes: 42
  },
  {
    title: 'Red for Fire',
    author: 'Solefald',
    url: 'www.solefald.com',
    likes: 11
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  blogsInDb, 
  usersInDb
}
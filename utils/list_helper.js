const lodash = require('lodash')

const dummy = (blogs) => {
  return blogs && 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : Math.max(...blogs.map(blog => blog.likes))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let obj = lodash.countBy(blogs, (blog) => blog.author)
    let authorMostBlogs = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
    let blogQuantity = obj[authorMostBlogs]
    return {author: authorMostBlogs, blogs: blogQuantity}
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let obj = lodash.countBy(blogs, (blog) => blog.author)
    let authorMostBlogs = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
    let blogQuantity = obj[authorMostBlogs]
    return {author: authorMostBlogs, blogs: blogQuantity}
  }
}
 
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function (acc, { likes }) { return acc + likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length !== 0) {
    var favour = blogs.sort((a, b) => a.likes < b.likes)[0]
    return { title: favour.title, author: favour.author, likes: favour.likes }
  } else {
    return null
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length !== 0) {
    const authorBlogsArray = _.chain(_.map(blogs, 'author'))
      .countBy()
      .toPairs()
      .maxBy(_.last)
      .value()

    const authorWithMostBlogs = {
      author: authorBlogsArray[0],
      blogs: authorBlogsArray[1]
    }

    return authorWithMostBlogs
  } else {
    return null
  }
}

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    var authorArray =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        author: key,
        likes: _.sumBy(objs, 'likes')
      }))
      .value()

    return _.maxBy(authorArray, 'likes')
  } else {
    return null
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

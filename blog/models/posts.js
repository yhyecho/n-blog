const Post = require('../lib/mongo').Post
const marked = require('marked')

module.exports = {
    create: (post) => {
        return Post.create(post).exec()
    },
    
    getPostById: (postId) => {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .addCreateAt()
            .contentToHtml()
            .exec()
    },

    getPosts: (author) => {
        const query = {}
        if (author) {
            query.author = author
        }

        return Post
            .find(query)
            .populate({ path: 'author', 'model': 'User' })
            .sort({ _id: -1 })
            .addCreateAt()
            .contentToHtml()
            .exec()
    },

    incPv: (postId) => {
        return Post
            .update({ _id: postId }, { $inc: { pv: 1 } })
            .exec()
    }
}

Post.plugin('contentToHtml', {
    afterFind: (posts) => {
        return posts.map((post) => {
            post.content = marked(post.content)
            return post
        })
    },
    afterFindOne: (post) => {
        if (post) {
            post.content = marked(post.content)
        }
        return post
    }
})
const config = require('config-lite')
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

mongolass.connect(config.mongodb)

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string'},
    avatar: { type: 'string'},
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: {type: 'string'}
})
exports.User.index({ name: 1 }, { unique: true }).exec()

exports.Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: {type: 'string' },
    pv: {type: 'number' }
})
exports.Post.index({ author: 1, _id: -1 }).exec()

mongolass.plugin('addCreateAt', {
    afterFind: (results) => {
        results.forEach((item) => {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
    },
    afterFindOne: (result) => {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})
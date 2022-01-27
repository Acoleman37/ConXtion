const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Vote.belongsToMany(User, {
    foreignKey:
})

module.exports = { User, Post, Vote, Comment }
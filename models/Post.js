const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'content',
                    'title',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
                ],
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        include: {
                            model: models.User,
                            attributes: ['user_username']
                        }
                    }
                ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
        content: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  len: [1],
              }
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
          },
        grouping: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        event_dates: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;
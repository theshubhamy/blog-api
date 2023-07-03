import { Sequelize } from 'sequelize';
import {UserModel} from './user.js';
import {BlogModel} from './blog.js';
import {CommentModel} from './comment.js';

const sequelize = new Sequelize(
  "blogpostdb",
  "root",
  "",
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  },
  {
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = UserModel(sequelize, Sequelize);
const Blog = BlogModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

export {
  sequelize,
  User,
  Blog,
  Comment,
};

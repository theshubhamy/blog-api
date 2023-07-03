
# Blog API

This is a RESTful API for managing a simple blog system. It allows users to create, read, update, and delete blog posts, as well as add comments to blog posts.

## Features

- User authentication and authorization
- CRUD operations for blog posts
- Comment functionality for blog posts

## Technologies Used

- Node.js
- Express.js
- Mysql with Sequlize
- bcrypt for password hashing
- jsonwebtoken for user authentication
- Jest for testing

## Prerequisites

- Node.js installed on your machine
- MySql installed and running

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/theshubhamy/blog-api.git
cd blog-api
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

Create a `.env` file in the root directory and add the following:

```
NODE_ENV=DEV
PORT=5500
JWT_SECRET=aRandomLongStringToSignTheTokensIssuedByTheServer

```

Make sure to replace `your-secret-key` with your own secret key for JWT token generation.

4. Start the server:

```bash
npm start
```

The server will start running on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in with existing credentials.

### Blog Posts

- `POST /api/blogs`: Create a new blog post.
- `GET /api/blogs/:blogId`: Retrieve a specific blog post by ID.
- `PUT /api/blogs/:blogId`: Update an existing blog post.
- `DELETE /api/blogs/:blogId`: Delete a blog post.
- `GET /api/blogs`: List all blog posts.

### Comments

- `POST /api/blogs/:blogId/comments`: Add a comment to a blog post.
- `GET /api/blogs/:blogId/comments`: List comments for a specific blog post.

### Authentication and Authorization

To perform CRUD operations on blog posts and comments, you need to include the `Authorization` header in your requests with a valid JSON Web Token (JWT). 

Example:

```
Authorization: Bearer your-token
```

Replace `your-token` with the actual token obtained after successful authentication.

## Testing

To run the unit tests, use the following command:

```bash
npm test
```

The tests cover the major use cases and edge cases for the API endpoints.

## Conclusion

Congratulations! You have successfully set up and run the Blog API. You can now integrate it with your frontend application or test it using tools like Postman.

Feel free to modify and enhance the code according to your specific requirements.
# UltimatePosts

UltimatePosts is a web application where users can create accounts, post content, and interact with other users' posts through comments. It provides a platform for users to share their thoughts and ideas with a community of like-minded individuals.

## Features

- **User Authentication**: Users can sign up for an account or log in with existing credentials to access the platform.
- **Post Creation**: Logged-in users can create posts by providing a title, image URL, and description.
- **Post Viewing**: Users, whether logged in or not, can view all posts and their details.
- **Commenting**: Users can comment on posts, fostering engagement and interaction within the community.
- **Authorization**: Only the owner of a post or comment can delete or modify it, ensuring user privacy and control over their content.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB Atlas**: Cloud-hosted MongoDB database for storing user information, posts, and comments.
- **Passport.js**: Authentication middleware for Node.js, used for user authentication.
- **EJS (Embedded JavaScript)**: Templating language for generating HTML markup with JavaScript.
- **dotenv**: Module for loading environment variables from a .env file.
- **Other Dependencies**: Body-parser, connect-flash, method-override for middleware and utility functionalities.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your MongoDB Atlas connection URL as `DB_URL`.
4. Start the server using `npm start`.
5. Access the application at `http://localhost:3000`.

## Usage

- Visit the homepage to browse through existing posts.
- Sign up for an account or log in if you haven't already.
- Create a new post by clicking on the "New Post" button and filling out the form.
- View the details of a post by clicking on its title.
- Comment on posts by scrolling down to the comments section and submitting your comment.
- Manage your posts and comments through the user dashboard.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

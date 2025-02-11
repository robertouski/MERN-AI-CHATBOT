# MERN-AI-CHATBOT

AI Real-Time Chatbot: Leveraging OpenAI's API, this project offers a ChatGPT-like bot that stores and allows deletion of user chats. It features a dynamic UI capable of displaying code blocks, making it an ideal tool for developers looking to integrate AI-powered interactions within their applications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

```bash
node --version
npm --version
```

### Installing
Follow these steps to get a development environment running:

```bash
Clone the repository:

git clone https://github.com/robertouski/MERN-AI-CHATBOT.git
cd MERN-AI-CHATBOT

Setup Backend:

cd backend
npm install
npm run dev

Setup Frontend:

cd frontend
npm install
npm run dev
```
### Environment Config
To ensure the application runs correctly on your local machine, you will need to set up environment variables on Backend file ".env".
```bash
Here's an explanation of each environment variable:

MONGODB_URL: The connection string to your MongoDB database. Ensure you replace this with the actual URL of your MongoDB instance, which might look something like mongodb://localhost:27017/yourdatabasename.

PORT: The port number on which your server will listen. The default value is 3000, but you can change it based on your preference or requirements.

OPENAI_ORG_ID: This is your organization ID from OpenAI. It is used to identify your organization in API requests to the OpenAI services.

OPENAI_API_KEY: Your API key for accessing OpenAI's API. This key is crucial for making authenticated requests to OpenAI for processing and generating responses based on the input received by your application.

JWT_SECRET: A secret key used for signing and verifying JSON Web Tokens (JWT). This should be a long, complex string to ensure security.

COOKIE_SECRET: A secret used for signing and verifying cookies. The default value provided is "auth_token", but it is strongly recommended to change this to a more secure string in a production environment.
```

### Usage
```bash
--After you log in--
While in chat page you need to:
1.-Sign Up
2.- Log in
3.- Go to Chat page

NOW you can! 
-start AI chatbot conversation
-view chat history
-and delete chat history
```
### Built With
```bash
React - The web framework used for the frontend
Node.js - Server environment
Express - Web framework for the backend
MongoDB - Database system
OpenAI API - AI model integration for chat functionality
```

NOTE: Swagger documentation in case you want to modify Fronted UI ✅
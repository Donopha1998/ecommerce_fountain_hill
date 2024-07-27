# E-Commerce Application

This is a simple e-commerce application built with React.js for the frontend and Node.js with Express for the backend. It includes features such as user authentication, product listing, cart management, and profile pages.


## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8.9 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or using a cloud service)

## Installation

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3.Run the application:

    ```bash
    npm run dev
    ```
    
### Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3.Run the application:

    ```bash
    npm start
    ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

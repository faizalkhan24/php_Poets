## Installation

To set up this project on your local machine, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone <your-repo-url>
```

Replace `<your-repo-url>` with the actual URL of your repository.

### 2. Navigate to the Project Directory

Change to the project directory:

cd my-project

Replace `my-project` with the name of your project directory.

### 3. Set Up the Backend

#### 3.1 Navigate to the Backend Directory

cd backend

#### 3.2 Install Backend Dependencies

npm install

#### 3.3 Set Up Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

DB_HOST=<your-database-host>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=<jwt-expiration-time>

Replace the placeholders with your actual database and JWT configuration details.

### 4. Set Up the Frontend

#### 4.1 Navigate to the Frontend Directory

cd ../frontend

#### 4.2 Install Frontend Dependencies
npm install

 4.3 Set Up Environment Variables

Create a `.env.local` file in the `frontend` directory and add the following environment variable:

.env
NEXT_PUBLIC_API_URL=<your-api-url>

Replace `<your-api-url>` with the URL of your backend API.

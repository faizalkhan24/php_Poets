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


Here's an updated version of the backend description, including additional conditions and error handling:

---

## Backend Overview

The backend of this project is built using Node.js with Express and MySQL. It handles user authentication, registration, and task management functionalities. Below is a detailed breakdown of its features, logic, and additional conditions.

### Features

1. **User Authentication**
   - **Register**: Allows new users to sign up by providing a username, email, and password. Checks if the username or email already exists in the database and ensures all fields are provided. The password is hashed before being stored.
   - **Login**: Authenticates users by checking the provided username and password against stored credentials. Handles cases where the username or password is incorrect and returns appropriate error messages.

2. **Task Management**
   - **Create Task**: Enables users to create new tasks with details such as title, description, and due date.
   - **Read Task**: Retrieves details of a specific task or a list of tasks.
   - **Update Task**: Allows users to update the details of an existing task.
   - **Delete Task**: Permits users to delete a specific task.

### Endpoints

#### User Authentication

1. **POST /users/register**
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string",
       "confirmPassword": "string"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with a message and user ID.
     - **Error Responses**:
       - `400 Bad Request`: For missing required fields.
       - `400 Bad Request`: If the username or email already exists.
       - `400 Bad Request`: If passwords do not match.
       - `500 Internal Server Error`: For unexpected errors.

2. **POST /users/login**
   - **Description**: Authenticates a user and returns a JWT.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response**:
     - **Success**: `200 OK` with a JWT token.
     - **Error Responses**:
       - `400 Bad Request`: For missing required fields.
       - `401 Unauthorized`: For invalid credentials.
       - `404 Not Found`: If the username is not found.
       - `500 Internal Server Error`: For unexpected errors.

#### Task Management

1. **POST /tasks**
   - **Description**: Creates a new task.
   - **Request Body**:
     ```json
     {
       "title": "string",
       "description": "string",
       "status": "pendding"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with the created task details.
     - **Error Responses**:
       - `400 Bad Request`: For missing required fields.
       - `500 Internal Server Error`: For unexpected errors.

2. **GET /get/:id**
   - **Description**: Retrieves a specific task by ID.
   - **Response**:
     - **Success**: `200 OK` with task details.
     - **Error Responses**:
       - `404 Not Found`: If the task does not exist.
       - `500 Internal Server Error`: For unexpected errors.

3. **PUT /update/:id**
   - **Description**: Updates a task by ID.
   - **Request Body**:
     ```json
     {
       "title": "string",
       "description": "string",
       "status": "pending"
     }
     ```
   - **Response**:
     - **Success**: `200 OK` with the updated task details.
     - **Error Responses**:
       - `400 Bad Request`: For missing required fields.
       - `404 Not Found`: If the task does not exist.
       - `500 Internal Server Error`: For unexpected errors.

4. **DELETE /delete/:id**
   - **Description**: Deletes a task by ID.
   - **Response**:
     - **Success**: `204 No Content` indicating the task was deleted.
     - **Error Responses**:
       - `404 Not Found`: If the task does not exist.
       - `500 Internal Server Error`: For unexpected errors.

### Additional Conditions

#### User Registration
- **All Fields Required**: Username, email, password, and confirmPassword are required.
- **Unique Username and Email**: Checks if the username or email already exists in the database.
- **Password Match**: Ensures that the `password` and `confirmPassword` fields match.
- **Error Handling**: Provides specific error messages for missing fields, existing usernames or emails, and mismatched passwords.

#### User Login
- **All Fields Required**: Username and password are required.
- **Invalid Credentials**: Returns an error if the username or password is incorrect.
- **User Not Found**: Returns a specific error if the username is not found in the database.
- **Error Handling**: Provides specific error messages for missing fields, invalid credentials, and unexpected errors.

#### Task Management
- **All Fields Required**: Ensures that all necessary fields (title, description, dueDate) are provided when creating or updating a task.

### Database Schema

- **Users Table**:
  - `id` (Primary Key)
  - `username` (Unique)
  - `email` (Unique)
  - `password` (Hashed)

- **Tasks Table**:
  - `id` (Primary Key)
  - `title`
  - `description`
  - `status`
  - `userId` (Foreign Key referencing Users)

### Error Handling

- **Validation Errors**: Returns specific error messages for validation issues.
- **Server Errors**: Logs errors and returns generic error messages to the client.


Here's a comprehensive description of the frontend setup for your project, including the login, signup, and dashboard pages, as well as the various components used.

---

## Frontend Overview

The frontend of this project is built using React and Next.js. It includes several key components and pages for user authentication and task management. Below is a detailed description of how the frontend is structured, along with descriptions of the main components.

### Pages

1. **Login Page**
   - **Path**: `/login`
   - **Description**: Provides a form for users to log in using their username and password. On successful login, users are redirected to the dashboard. If credentials are incorrect, appropriate error messages are displayed.
   - **Features**:
     - Form fields for username and password.
     - Error message display.
     - Link to the signup page for new users.

2. **Signup Page**
   - **Path**: `/signup`
   - **Description**: Allows new users to register by providing a username, email, password, and confirmPassword. Validates that all fields are provided and that passwords match before submitting. On successful signup, users are redirected to the login page.
   - **Features**:
     - Form fields for username, email, password, and confirmPassword.
     - Error and success message display.
     - Link to the login page for existing users.

3. **Dashboard Page**
   - **Path**: `/dashboard`
   - **Description**: Displays the main application interface, including a sidebar, header, and task table. Allows users to view and manage tasks.
   - **Features**:
     - Sidebar for navigation.
     - Header with user information and logout button.
     - Task table for viewing tasks.
     - Integration with modals for task creation and deletion.

### Components

1. **Sidebar**
   - **Path**: `components/Sidebar.tsx`
   - **Description**: Provides navigation links to different sections of the application.
   - **Features**:
     - Links to Dashboard and other pages.

2. **Header**
   - **Path**: `components/Header.tsx`
   - **Description**: Displays the application title and user information. Includes a logout button that clears the authentication token and redirects to the login page.
   - **Features**:
     - Title display.
     - User greeting.
     - Logout button functionality.

3. **Task Table**
   - **Path**: `components/TaskTable.tsx`
   - **Description**: Shows a list of tasks in a tabular format. Provides options to view, edit, and delete tasks.
   - **Features**:
     - Display tasks with details such as title, description, and due date.
     - Edit and delete task options.

4. **TaskCreateModal**
   - **Path**: `components/TaskCreateModal.tsx`
   - **Description**: Modal component for creating new tasks and updating existing tasks. Uses the same component for both operations.
   - **Features**:
     - Form fields for task title, description, and due date.
     - Save and cancel buttons.
     - Supports both creating new tasks and updating existing ones.

5. **ConfirmationModal**
   - **Path**: `components/ConfirmationModal.tsx`
   - **Description**: Modal component for confirming the deletion of tasks. Provides options to confirm or cancel the deletion.
   - **Features**:
     - Confirmation message.
     - Confirm and cancel buttons.

6. **DashboardLayout**
   - **Path**: `components/DashboardLayout.tsx`
   - **Description**: Layout component for arranging the sidebar, header, and main content area (including the task table and modals).
   - **Features**:
     - Sidebar and header placement.
     - Main content area for displaying task-related components.

7. **WithAuth**
   - **Path**: `components/WithAuth.tsx`
   - **Description**: Higher-order component (HOC) to protect routes from unauthenticated access. Redirects users to the login page if they are not authenticated.
   - **Features**:
     - Checks for authentication token.
     - Redirects unauthenticated users to the login page.

### Authentication and Access Control

- **WithAuth HOC**: Applied to the dashboard and other protected pages to ensure that only authenticated users can access them. If a user attempts to access a protected page without being logged in, they will be redirected to the login page.

### Frontend Workflow

1. **User Authentication**: Users must log in or sign up before accessing the dashboard. The `WithAuth` HOC ensures that only authenticated users can access protected routes.

2. **Task Management**: 
   - **Creating Tasks**: Users can create new tasks using the `TaskCreateModal`.
   - **Updating Tasks**: Users can update existing tasks through the same modal.
   - **Deleting Tasks**: Users can delete tasks, with confirmation provided by the `ConfirmationModal`.

3. **Navigation**: The `Sidebar` and `Header` components facilitate navigation and user interaction throughout the application.

### Error Handling and User Feedback

- **Login and Signup Pages**: Display appropriate error and success messages based on user actions and server responses.
- **Modals**: Provide feedback and confirmation prompts for task management operations.

---

This overview provides a detailed description of the frontend setup, including how components interact, authentication flows, and task management features.


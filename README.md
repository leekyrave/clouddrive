# Drive

This project uses the following technologies:

- **Backend**: 
  - **Express**: A fast and minimalist web framework for Node.js.
  - **Sequelize**: ORM for managing database models and interactions with MariaDB.
  - **JWT Authentication**: JSON Web Token for secure authorization.
  - **File Upload**: Chunked file upload implemented for efficient large file handling.
  - **Swagger**: API documentation for easy testing and understanding of endpoints.

- **Frontend**:
  - **Vue.js**: Frontend framework for building user interfaces.
  - **Pinia**: State management for Vue 3, used for handling global state.
  - **Axios**: Promise-based HTTP client for making requests to the backend.

- **Database**:
  - **MariaDB**: Relational database management system for storing application data.

---

## Setup Instructions

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:

   Copy the `.env.example` file to `.env` and adjust the values for your local setup.

   ```bash
   cp .env.example .env
   ```

3. **Run database migrations**:

   To apply the database migrations, run the following command:

   ```bash
   npx sequelize-cli db:migrate
   ```

   **Note**: You may encounter issues with the `createdAt` fields due to potential database configuration mismatches. Please ensure your MariaDB server's timezone is properly configured and that the Sequelize model definitions align with your database's column defaults.

4. **Start the server**:

   Run the development server:

   ```bash
   npm start
   ```

5. **Swagger Documentation**:

   After starting the server, you can access the Swagger API documentation at:

   ```
   http://localhost:3000/api-docs
   ```

---

## Planned Features

- **Redis Integration**: In the future, we planned to integrate Redis for caching to improve performance, but due to time constraints, it has not been implemented yet.
  
- **File Editing**: We also intended to add a feature for editing uploaded files, but unfortunately, time did not permit us to complete this feature.

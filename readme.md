
### Create a New User

- **URL**: `http://localhost:5000/api/users/`
- **Method**: `POST`
- **Description**: Creates a new user.

### Get All Users

- **URL**: `http://localhost:5000/api/users/`
- **Method**: `GET`
- **Description**: Retrieves all users.

### Get User by ID

- **URL**: `http://localhost:5000/api/users/:userId`
- **Method**: `GET`
- **Description**: Retrieves a user by their ID.


### Update User by ID

- **URL**: `http://localhost:5000/api/users/:userId`
- **Method**: `PUT`
- **Description**: Updates a user by their ID.

### Delete User by ID

- **URL**: `http://localhost:5000/api/users/:userId`
- **Method**: `DELETE`
- **Description**: Deletes a user by their ID.

## Installation

1. Clone the repository.
   ```
   git clone https://github.com/Hossain-Ahamed/User-and-order-management.git
   ```
2. Navigate to the project directory.
   ```
   cd User-and-order-management
   ```
3. Install the dependencies.
   ```
   npm install
   ```
4.add the mongoDBURL provided in the submission file 
   ```
   mongodb+srv://*******:*******@trial01.9ddajtx.mongodb.net/u****?
   ```
5. Start the server.

   - Run this command for development build
   
     ```
     npm run start:dev
     ```
   - For production build

     ```
     npm run start:prod
     ```

 

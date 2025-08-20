# School Management API

A simple and efficient Node.js API for managing school data. This application allows users to add new schools to a database and retrieve a list of all schools sorted by proximity to a given geographic location.

This project was built with **Node.js**, **Express.js**, and **MySQL**. It is deployed and live on **Clever Cloud**.

-----

### Technologies Used

  - **Backend**: Node.js, Express.js
  - **Database**: MySQL
  - **Dependencies**: mysql2, dotenv
  - **Deployment**: Clever Cloud
  - **API Testing**: Postman

-----

### Live API Endpoints

The API is hosted on Clever Cloud and is publicly accessible.

**Base URL**: `https://app-e613e921-2f2c-45b0-903a-15ea152eeca1.cleverapps.io`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/addSchool` | Adds a new school to the database. |
| `GET` | `/listSchools?lat={value}&lon={value}` | Lists all schools sorted by distance from a user. |

-----

### API Documentation

#### 1\. Add a New School

Adds a new school record to the database.

  - **URL**: `/addSchool`
  - **Method**: `POST`
  - **Body (`raw/json`)**:
    ```json
    {
        "name": "Oakridge International School",
        "address": "Gachibowli, Hyderabad",
        "latitude": 17.4435,
        "longitude": 78.3519
    }
    ```
  - **Success Response (201 Created)**:
    ```json
    {
        "message": "School added successfully!",
        "schoolId": 1
    }
    ```
  - **Error Response (400 Bad Request)**:
    ```json
    {
        "error": "All fields (name, address, latitude, longitude) are required."
    }
    ```

#### 2\. List Schools by Proximity

Fetches all schools from the database and sorts them based on the geographical distance from the user's provided coordinates. The distance is calculated using the Haversine formula and is returned in kilometers.

  - **URL**: `/listSchools`
  - **Method**: `GET`
  - **Query Parameters**:

| Parameter | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `lat` | `Float` | The user's latitude. | Yes |
| `lon` | `Float` | The user's longitude. | Yes |

  - **Example Request**: `GET https://app-e613e921-2f2c-45b0-903a-15ea152eeca1.cleverapps.io/listSchools?lat=17.41&lon=78.47`
  - **Success Response (200 OK)**:
    ```json
    [
        {
            "id": 1,
            "name": "Oakridge International School",
            "address": "Gachibowli, Hyderabad",
            "latitude": 17.4435,
            "longitude": 78.3519,
            "distance": 13.9189123456789
        },
        {
            "id": 2,
            "name": "Jubilee Hills Public School",
            "address": "Jubilee Hills, Hyderabad",
            "latitude": 17.4313,
            "longitude": 78.4024,
            "distance": 7.54321098765432
        }
    ]
    ```

-----

### Postman Collection

A Postman collection has been created for easy testing of the API endpoints. It includes example requests for all available endpoints.

[Access the Postman Collection Here](https://.postman.co/workspace/My-Workspace~e1a6355b-ebd6-4724-83c2-ebf4930f5632/collection/undefined?action=share&creator=41847856)

-----

### Local Development Setup

To run this project on your local machine, follow these steps:

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Zayed024/School-api.git
    cd School-api
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Create a `.env` File**:
    Create a file named `.env` in the root of the project and add your MySQL database credentials:

    ```
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    ```

4.  **Set up the Database**:
    Run the following SQL query in your MySQL client to create the necessary `schools` table:

    ```sql
    CREATE TABLE schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    );
    ```

5.  **Start the Server**:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

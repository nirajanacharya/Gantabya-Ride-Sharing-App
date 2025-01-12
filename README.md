


(for reference of design: https://flash.figr.design/explore/mobile/Apps/Uber)



![Screenshot 2025-01-11 190215](https://github.com/user-attachments/assets/bf5d2719-7f82-439b-8a6a-7512f9e12b01)
![Screenshot 2025-01-11 190204](https://github.com/user-attachments/assets/93ffb8d7-c2fd-441f-bb16-ffc6ddb89d29)
![Screenshot 2025-01-11 190157](https://github.com/user-attachments/assets/2736bbbf-6d3c-472a-963d-a2018bfefc34)
![Screenshot 2025-01-11 190226](https://github.com/user-attachments/assets/62075c08-7c6d-499e-8290-372f23f7091f)


# API Documentation

## Users Endpoints

### Endpoint: `/users/register`

#### Method: POST

#### Description:
This endpoint is used to register a new user. It validates the input data, hashes the user's password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

#### Request Body:
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

#### Responses:

##### 201 Created

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "First",
      "lastname": "Last"
    },
    "email": "user@example.com"
    // ...other user fields...
  }
}
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f5a3a5b4d1c826d8d3e8a1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
    // ...other user fields...
  }
}
```

##### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other validation errors...
  ]
}
```

**Example Response:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Endpoint: `/users/login`

#### Method: POST

#### Description:
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user data.

#### Request Body:
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```



#### Responses:





##### 200 OK

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "First",
      "lastname": "Last"
    },
    "email": "user@example.com"
    // ...other user fields...
  }
}
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f5a3a5b4d1c826d8d3e8a1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
    // ...other user fields...
  }
}
```

##### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other validation errors...
  ]
}
```

**Example Response:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

##### 401 Unauthorized

```json
{
  "message": "Invalid Email or Password"
}
```

**Example Response:**

```json
{
  "message": "Invalid Email or Password"
}
```

### Endpoint: `/users/profile`

#### Method: GET

#### Description:
This endpoint is used to get the profile of the authenticated user.

#### Responses:

##### 200 OK

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "First",
    "lastname": "Last"
  },
  "email": "user@example.com"
  // ...other user fields...
}
```

### Endpoint: `/users/logout`

#### Method: GET

#### Description:
This endpoint is used to log out the authenticated user by clearing the token and blacklisting it.

#### Responses:

##### 200 OK

```json
{
  "message": "Logged out successfully"
}
```

## Captains Endpoints

### Endpoint: `/captains/register`

#### Method: POST

#### Description:
This endpoint is used to register a new captain. It validates the input data, hashes the captain's password, creates a new captain in the database, and returns a JSON Web Token (JWT) along with the captain data.

#### Request Body:
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)",
  "vehicle": {
    "color": "string (min: 3 characters, required)",
    "plate": "string (min: 3 characters, required)",
    "capacity": "number (min: 1, required)",
    "vehicleType": "string (one of ['car', 'motorcycle', 'auto'], required)"
  }
}
```

#### Responses:

##### 201 Created

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "First",
      "lastname": "Last"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields...
  }
}
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60f5a3a5b4d1c826d8d3e8a1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields...
  }
}
```

##### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other validation errors...
  ]
}
```

**Example Response:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
##### 401 Unauthorized

```json
{
  "message": "Invalid Email or Password"
}
```

**Example Response:**

```json
{
  "message": "Invalid Email or Password"
}
```

<<<<<<< HEAD
<<<<<<< HEAD
### Endpoint: `/captains/login`

#### Method: POST

#### Description:
This endpoint is used to log in an existing captain. It validates the input data, checks the captain's credentials, and returns a JSON Web Token (JWT) along with the captain data.

#### Request Body:
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

#### Responses:

##### 200 OK

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "First",
      "lastname": "Last"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields...
  }
}
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60f5a3a5b4d1c826d8d3e8a1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields...
  }
}
```

##### 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other validation errors...
  ]
}
```

**Example Response:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

##### 401 Unauthorized

```json
{
  "message": "Invalid Email or Password"
}
```

**Example Response:**

```json
{
  "message": "Invalid Email or Password"
}
```

### Endpoint: `/captains/profile`

#### Method: GET

#### Description:
This endpoint is used to get the profile of the authenticated captain.

#### Responses:

##### 200 OK

```json
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "First",
    "lastname": "Last"
  },
  "email": "captain@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
  // ...other captain fields...
}
```

### Endpoint: `/captains/logout`

#### Method: GET

#### Description:
This endpoint is used to log out the authenticated captain by clearing the token and blacklisting it.

#### Responses:

##### 200 OK

```json
{
  "message": "Logged out successfully"
}
```
```
=======
=======
>>>>>>> 1b2a89486c97ee92e0b5ad69b9e3aeb2d00348a8
users

 and `/captains`:

<<<<<<< HEAD
>>>>>>> 1b2a89486c97ee92e0b5ad69b9e3aeb2d00348a8
=======
>>>>>>> 1b2a89486c97ee92e0b5ad69b9e3aeb2d00348a8

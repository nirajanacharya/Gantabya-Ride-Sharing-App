

(for reference of design: https://flash.figr.design/explore/mobile/Apps/Uber)



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
````

nirajanacharya: update readme 

GitHub Copilot: Here is the updated `readme.md` file with the available routes for 

users

 and `/captains`:

```markdown
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
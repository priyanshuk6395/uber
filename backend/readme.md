# User API Documentation

## Register User
Endpoint for creating a new user account.

**URL**: `/user/register`  
**Method**: `POST`  
**Content-Type**: `application/json`

### Request Body
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email address
- **fullname.firstname**: Minimum 1 character required
- **fullname.lastname**: Minimum 3 characters required
- **password**: Minimum 5 characters required

### Response

#### Success Response
**Code**: `201 CREATED`
```json
{
    "token": "jwt_token_string",
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `400 BAD REQUEST`
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```
### Example Response
**Code**: `201 CREATED`
```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "user": {
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com",
            "_id": "60d0fe4f5311236168a109ca",
            "password":"$2b$10$st3YwfT3ULYH1SmG1yUJueoZzcAzUirsmQ77xQ1FDMYzPzhLKDN.O",
            "__v": 0
        }
    }
```

### Notes
- Password is automatically hashed before storage
- JWT token is generated upon successful registration
- Email must be unique in the system

## Login User
Endpoint for authenticating existing users.

**URL**: `/user/login`  
**Method**: `POST`  
**Content-Type**: `application/json`

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email address
- **password**: Minimum 5 characters required

### Response

#### Success Response
**Code**: `201 CREATED`
```json
{
    "token": "jwt_token_string",
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `400 BAD REQUEST`
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Invalid credentials"
}
```

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
### Example Response
**Code**: `201 CREATED`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "60d0fe4f5311236168a109ca",
        "__v": 0
    }
}
```

### Notes
- Password is compared with hashed version in database
- JWT token is generated upon successful authentication

## Profile
Endpoint for retrieving the profile of the authenticated user.

**URL**: `/user/profile`  
**Method**: `GET`  
**Content-Type**: `application/json`  
**Authorization**: `Bearer <token>` or `Cookie: token=<jwt_token>`

### Response

#### Success Response
**Code**: `200 OK`
```json
{
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Authentication failed"
}
```

### Example Response
**Code**: `200 OK`
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "60d0fe4f5311236168a109ca",
        "__v": 0
    }
}
```

### Notes
- Requires a valid JWT token in the `Authorization` header or as a cookie

## Logout User
Endpoint for logging out the authenticated user.

**URL**: `/user/logout`  
**Method**: `POST`  
**Content-Type**: `application/json`  
**Authorization**: `Bearer <token>` or `Cookie: token=<jwt_token>`

### Response

#### Success Response
**Code**: `200 OK`
```json
{
    "message": "Logout successful"
}
```

#### Error Response
**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Authentication failed"
}
```

### Example Response
**Code**: `200 OK`
```json
{
    "message": "Logout successful"
}
```

### Notes
- Requires a valid JWT token in the `Authorization` header or as a cookie

# Captain API Documentation

## Register Captain
Endpoint for creating a new captain account.

**URL**: `/captain/register`  
**Method**: `POST`  
**Content-Type**: `application/json`

### Request Body
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "int",
        "vehicleType": "car"
    }
}
```

### Validation Rules
- **email**: Must be a valid email address
- **fullname.firstname**: Minimum 1 character required
- **fullname.lastname**: Minimum 3 characters required
- **password**: Minimum 5 characters required
- **vehicle.color**: Minimum 1 character required
- **vehicle.plate**: Minimum 1 character required
- **vehicle.capacity**: Must be an integer and at least 1
- **vehicle.vehicleType**: Must be one of ["car", "motorcycle", "auto"]

### Response

#### Success Response
**Code**: `201 CREATED`
```json
{
    "token": "jwt_token_string",
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `400 BAD REQUEST`
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```
### Example Response
**Code**: `201 CREATED`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "60d0fe4f5311236168a109ca",
        "password":"$2b$10$st3YwfT3ULYH1SmG1yUJueoZzcAzUirsmQ77xQ1FDMYzPzhLKDN.O",
        "__v": 0
    }
}
```

### Notes
- Password is automatically hashed before storage
- JWT token is generated upon successful registration
- Email must be unique in the system

## Login Captain
Endpoint for authenticating existing captains.

**URL**: `/captain/login`  
**Method**: `POST`  
**Content-Type**: `application/json`

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email address
- **password**: Minimum 5 characters required

### Response

#### Success Response
**Code**: `201 CREATED`
```json
{
    "token": "jwt_token_string",
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `400 BAD REQUEST`
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Invalid credentials"
}
```

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
### Example Response
**Code**: `201 CREATED`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "60d0fe4f5311236168a109ca",
        "__v": 0
    }
}
```

### Notes
- Password is compared with hashed version in database
- JWT token is generated upon successful authentication

## Profile
Endpoint for retrieving the profile of the authenticated captain.

**URL**: `/captain/profile`  
**Method**: `GET`  
**Content-Type**: `application/json`  
**Authorization**: `Bearer <token>` or `Cookie: token=<jwt_token>`

### Response

#### Success Response
**Code**: `200 OK`
```json
{
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
}
```

#### Error Response
**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Authentication failed"
}
```

### Example Response
**Code**: `200 OK`
```json
{
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "60d0fe4f5311236168a109ca",
        "__v": 0
    }
}
```

### Notes
- Requires a valid JWT token in the `Authorization` header or as a cookie

## Logout Captain
Endpoint for logging out the authenticated captain.

**URL**: `/captain/logout`  
**Method**: `POST`  
**Content-Type**: `application/json`  
**Authorization**: `Bearer <token>` or `Cookie: token=<jwt_token>`

### Response

#### Success Response
**Code**: `200 OK`
```json
{
    "message": "Logout successful"
}
```

#### Error Response
**Code**: `401 UNAUTHORIZED`
```json
{
    "message": "Authentication failed"
}
```

### Example Response
**Code**: `200 OK`
```json
{
    "message": "Logout successful"
}
```

### Notes
- Requires a valid JWT token in the `Authorization` header or as a cookie
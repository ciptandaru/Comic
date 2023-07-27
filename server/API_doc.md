## Restaurant

#### Routes

List of Routes:

| Endpoints                | Description                                            |
| :----------------------- | :----------------------------------------------------- |
| `POST /register`         | Membuat entitas user                                  |
| `POST /login`          | mengambil access token                    |
| `POST /glogin`      | mengambil access token     |
| `GET /profile`      | mengambil data entitas User       |
| `PUT /profile`    | Mengedit data entitas User |
| `POST /categories`       | Membuat entitas \*Category\*\*                         |
| `GET /`        | Mengambil semua data entitas Utama              |
| `POST /donate `        | Mengambil data token MidTrans            |
| `GET /favorite`         | Mengambil count dari entitas utama dan User      |
| `POST /favorite/:id`   | membuat data entitas favorite        |
| `GET /detail/:slug` | Mengambil data **Detail**         |


#### 1. POST /register

#### Description

```http
 	Membuat user baru
```

#### Response

_200 - Created_

- Body

```http
{
    "id": 2,
    "email": "tes@email.com"
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "error": [
        "UserName cannot be empty!",
        "Email is Already!",
        "Email cannot be empty!"
        "Password cannot be empty!!"
    ]
}
```

#### 2. POST /login

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem
```

#### Response

_200 - OK_

- Body

```http
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyM0BlbWFpbC5jb20iLCJpYXQiOjE2ODQ1NzQyMDN9.37vMpt19AiosBql3PruqTYgZ0BZCLUgv7MzBfK-ssfY",
    "id": 5,
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Email not found"
}
```

```http
{
    "statusCode": 401,
    "error": "Username/Password invalid!"
}
```

#### 3. POST /glogin

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem menggunakan akun Google
```

#### Request

- Headers

```http
  {
  "token_google": String
  }
```

#### Response

- Body
  _200 - OK_

```http
{
    "statusCode": 200,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "msg": "Logged in"
}
```

_201 - Created_

```http
{
    "statusCode": 201,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "msg": "created"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Forbidden, not enough access!"
}
```

#### 4. POST /cuisines

#### Description

```http
  Membuat entitas utama
```

#### Request

- Headers

```http
  {
  "Content-Type": "application/x-www-form-urlencoded"
  }
```

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "name": String,
  "description": String,
  "price": Integer,
  "imgUrl": String,
  "authorId": Integer,
  "categoryId": Integer
  }
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 13,
        "name": "asdd",
        "description": "qwertyuiopasdfgnm",
        "price": 100000,
        "imgUrl": "https://images.unsplash.com/photo-1683644673880-dadc9f45b32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "updatedAt": "2023-05-27T06:23:13.578Z",
        "createdAt": "2023-05-27T06:23:13.578Z",
        "status": "Active"
    },
    "createHistory": {
        "id": 7,
        "name": "POST",
        "description": "asdd with 13 created",
        "updatedBy": "user",
        "updatedAt": "2023-05-27T06:23:13.586Z",
        "createdAt": "2023-05-27T06:23:13.586Z"
    }
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "message:": "Name cannot be empty!",
                "Description cannot be empty!",
                "Price cannot be empty!",
                "Price should not be below 5000!",
                "Image cannot be empty!",
                "User cannot be empty!",
                "Category cannot be empty!"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```


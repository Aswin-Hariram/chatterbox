# 🍽️ Food Delivery API Documentation

## 🚀 User Management Endpoints

### 1️⃣ Create User
**Endpoint:** `POST /api/users`

**Request:**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
}
```

---

### 2️⃣ Get All Users (Paginated)
**Endpoint:** `GET /api/users?page=0&size=10`

**Response (200 OK):**
```json
{
    "content": [
        {
            "id": 1,
            "username": "john_doe",
            "email": "john@example.com"
        }
    ],
    "totalElements": 1,
    "totalPages": 1
}
```

---

### 3️⃣ Get All Users (Without Pagination)
**Endpoint:** `GET /api/users/all`

**Response (200 OK):**
```json
[
    {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com"
    }
]
```

---

### 4️⃣ Update User
**Endpoint:** `PUT /api/users/{id}`

**Request:**
```json
{
    "username": "john_updated",
    "email": "john_new@example.com",
    "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
    "id": 1,
    "username": "john_updated",
    "email": "john_new@example.com"
}
```

---

### 5️⃣ Delete User
**Endpoint:** `DELETE /api/users/{id}`

**Response (204 No Content)**

---

### 6️⃣ Get User by ID
**Endpoint:** `GET /api/users/{id}`

**Response (200 OK):**
```json
{
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
}
```

---

### 7️⃣ User Login
**Endpoint:** `GET /api/users/login?email=john@example.com&password=password123`

**Response (200 OK):**
```json
{
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
}
```

---

## 🏢 Restaurant Management Endpoints

### 1️⃣ Create Restaurant
**Endpoint:** `POST /api/restaurants`

**Request:**
```json
{
    "name": "Italian Restaurant",
    "address": "123 Main St"
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "name": "Italian Restaurant",
    "address": "123 Main St"
}
```

---

### 2️⃣ Get Restaurant by ID
**Endpoint:** `GET /api/restaurants/{id}`

**Response (200 OK):**
```json
{
    "id": 1,
    "name": "Italian Restaurant",
    "address": "123 Main St",
    "menuItems": []
}
```

---

### 3️⃣ Update Restaurant
**Endpoint:** `PUT /api/restaurants/{id}`

**Request:**
```json
{
    "name": "Updated Italian Restaurant",
    "address": "456 New St"
}
```

**Response (200 OK):**
```json
{
    "id": 1,
    "name": "Updated Italian Restaurant",
    "address": "456 New St"
}
```

---

### 4️⃣ Delete Restaurant
**Endpoint:** `DELETE /api/restaurants/{id}`

**Response (204 No Content)**

---

### 5️⃣ Get All Restaurants
**Endpoint:** `GET /api/restaurants`

**Response (200 OK):**
```json
[
    {
        "id": 1,
        "name": "Italian Restaurant",
        "address": "123 Main St"
    }
]
```

---

## 🍕 Menu Item Management Endpoints

### 1️⃣ Create Menu Item
**Endpoint:** `POST /api/restaurants/{restaurantId}/menu-items`

**Request:**
```json
{
    "name": "Spaghetti",
    "description": "Classic Italian pasta",
    "price": 12.99
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "name": "Spaghetti",
    "description": "Classic Italian pasta",
    "price": 12.99
}
```

---

## 📦 Order Management Endpoints

### 1️⃣ Create Order
**Endpoint:** `POST /api/orders/user/{userId}`

**Request:**
```json
{
    "restaurant": {"id": 1},
    "items": [
        {
            "menuItem": {"id": 1},
            "quantity": 2
        }
    ]
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "orderDate": "2024-03-14T10:30:00",
    "status": "PENDING",
    "totalAmount": 25.98,
    "items": [
        {
            "id": 1,
            "quantity": 2,
            "menuItem": {
                "id": 1,
                "name": "Spaghetti",
                "price": 12.99
            }
        }
    ]
}
```

---

This API documentation provides a structured, easy-to-read guide for interacting with the food delivery system. 🚀🍽️

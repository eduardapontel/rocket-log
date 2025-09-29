# Rocketlog 📦

Rocketlog is a **delivery tracking system** that allows users to log in and check the status of their orders.  
Depending on the user role, the system provides different access levels:
- **Customers** can only view their own deliveries.
- **Sellers** can access and manage all deliveries they handle.

<br>

## Features ✨

- **User authentication** using JWT.  
- **Role-based access control** for customers and sellers.  
- **Delivery management**, including status tracking and delivery logs.  
- **Secure REST API** built with Express and TypeScript.  
- **Automated tests** to ensure reliability of controllers and services.

<br>

## Project Structure 🗂️

- **`prisma/`** – Database schema and migrations for PostgreSQL
- **`src/`** – Application source code
  - **`controllers/`** – Handle HTTP requests and responses
    - `deliveries-controller.ts`
    - `deliveries-status-controller.ts`
    - `delivery-logs-controller.ts`
    - `sessions-controller.ts`
    - `users-controller.ts`
  - **`middlewares/`** – Middlewares for authentication and authorization
    - `ensure-authenticated.ts`
    - `verifyUserAuthorization.ts`
  - **`routes/`** – API route definitions
    - `index.ts`
  - **`services/`** – Business logic and database operations
    - `deliveries-service.ts`
    - `delivery-logs-service.ts`
    - `sessions-service.ts`
    - `users-service.ts`
  - **`utils/`** – Utility modules
    - `prisma-client.ts`
  - `app.ts` – Express app setup
  - `server.ts` – Application entry point
- `docker-compose.yml` – Docker setup for PostgreSQL
- `package.json` – Project dependencies and scripts
- `tsconfig.json` – TypeScript configuration
- `.env-example` – Environment variables example
- `.gitignore` – Git ignore rules
- `README.md` – Project documentation

<br>

## Technologies Used 🛠️

- **Node.js**
- **TypeScript**
- **Express**  
- **Prisma** 
- **JWT** 
- **Docker** 
- **Jest**

<br>

## Running Locally 🚀

1. Clone the repository:
```bash
   git clone https://github.com/eduardapontel/rocket-log.git
   cd rocket-log
```

2. Install dependencies:

```
  npm install
```
Create a .env file based on .env-example.

3. Start the database with Docker:

```
  docker-compose up -d
```

4. Run database migrations:

```
  npx prisma migrate dev
```

5. Start the application:

```
  npm run dev
```
The API will be available at (http://localhost:3333).

<br>

## API Endpoints 🌐

### Authentication
| Method | Endpoint    | Description                                   |
|------- |-------------|-----------------------------------------------|
| POST   | `/sessions` | Login with email/password and receive a JWT token |

### Users
| Method | Endpoint     | Description                    |
|------- |--------------|--------------------------------|
| POST   | `/users`     | Create a new user (customer or seller) |
| GET    | `/users/me`  | Get logged-in user profile     |

### Deliveries
| Method | Endpoint            | Description                          |
|------- |---------------------|--------------------------------------|
| POST   | `/deliveries`       | Create a new delivery               |
| GET    | `/deliveries`       | List deliveries (restricted by user role) |
| GET    | `/deliveries/:id`   | Get details of a specific delivery   |
| PUT    | `/deliveries/:id`   | Update delivery information          |
| DELETE | `/deliveries/:id`   | Delete a delivery (seller only)      |

### Delivery Status
| Method | Endpoint                  | Description                        |
|------- |---------------------------|------------------------------------|
| GET    | `/deliveries/:id/status`  | Retrieve current status of a delivery |
| PATCH  | `/deliveries/:id/status`  | Update the status of a delivery    |

### Delivery Logs
| Method | Endpoint                        | Description                              |
|------- |----------------------------------|------------------------------------------|
| GET    | `/delivery-logs/:deliveryId`     | List all logs of a delivery's status changes |

<br>

## 🤝 Contributing 

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are always welcome!

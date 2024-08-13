# Contract Tracker Service

## Description

This service provides functionality to get service contract and contract worker details. It is built using Spring Boot and utilizes Spring Data JPA for database operations with PostgreSQL.

## Project Structure

```
CONTRACT-TRACKER-SERVICE
├── .idea
├── .mvn
├── src
│   ├── main
│   │   ├── java/com/ainc/contract_tracker
│   │   │   ├── config
│   │   │   ├── controller
│   │   │   ├── dto
│   │   │   ├── exception
│   │   │   ├── model
│   │   │   ├── repository
│   │   │   ├── service
│   │   │   └── ContractTrackerApplication.java
│   │   └── resources
│   └── test
├── target
├── .env
├── .gitignore
├── Dockerfile
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

## Technologies Used

- Java 21
- Spring Boot 3.3.2
- Spring Data JPA
- Spring Security
- PostgreSQL
- Docker
- Maven
- Lombok
- ModelMapper
- SpringDoc OpenAPI (Swagger UI)
- JSON Web Token (JWT) for authentication

## Prerequisites

- Java Development Kit (JDK) 21
- Maven (or use the included Maven Wrapper)
- Docker (for containerization and deployment)
- PostgreSQL (for local development)

## Setup and Configuration

1. Clone the repository:

   ```
   git clone https://github.com/suryababus/intuit-contract-work-management.git
   cd contract-tracker-service
   ```

2. Set up the environment variables:
   ```
   DB_URL=jdbc:postgresql://your_db_host:5432/your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

### For Development

1. Build the project:

   ```
   ./mvnw clean install
   ```

2. Run the application:
   ```
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`.

### For Deployment (using Docker)

1. Build the Docker image:

   ```
   docker build --tag contract-tracker-service .
   ```

2. Run the Docker container:
   ```
   docker run --env-file .env --detach -p 8080:8080 contract-tracker-service
   ```
   Note: You have to setup .env file.

The application will be accessible on `http://localhost:8080`.

## API Documentation

Once the application is running, you can access the Swagger UI for API documentation:

```
http://localhost:8080/swagger-ui.html
```

## Testing

To run the tests, use the following command:

```
./mvnw test
```

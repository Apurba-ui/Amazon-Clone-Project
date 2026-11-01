# Project Video Reference


https://github.com/user-attachments/assets/31ccdefb-4491-40d1-91a0-2a8ca6bdf0a4



# 🛒 Full Stack eCommerce Web Application                           
A modern and scalable eCommerce web application where users can browse products, add them to their cart, and place orders. Built with the MERN stack and enhanced with Kafka for scalability and Docker for flexible deployments.

                  
## ✨ Features


Frontend: Built using ReactJS for a dynamic and responsive user interface.

Backend: 

    Developed with NodeJS and ExpressJS to handle business logic and API endpoints.

    Built in microserices archotectur containing 3 micro services :

    users-service, inventory-service, orders-service

Testing: All API endpoints are tested using Jest to ensure robustness and reliability.

Scalability: Integrated Kafka for handling asynchronous messaging and ensuring scalability for large user traffic.

Dockerized: Both frontend and backend are containerized using Docker for easy deployment across different environments.

Database: Utilizes MongoDB for efficient and flexible data storage.


## 🚀 Quick Start


### Prerequisites

Make sure you have the following installed on your system:

. Node.js

. Docker

. Git

### Clone the Repository


`git clone -b main <repo-url>`

`cd <project-folder>`  

### Frontend Setup

Navigate to the frontend directory:

`cd .\amazon-clone-frontend-main\amazon-clone-frontend-main\`

Install dependencies and start the development server:

npm install  

npm start  

Access the Frontend

The frotend application will be accessible at: http://localhost:3000.

### Backend Setup

Navigate to the backend directory:

cd .\amazon-clone-backend-main\amazon-clone-backend-main\

Install dependencies and start the backend server:

npm install  

node server.js  

Access the Backend

Backend Services will be accessible at urls : 

users-service : `http://localhost:8001`

inventory-service : `http://localhost:8002`

orders-service : `http://localhost:8003`

## 🛠️ Testing Backend APIs

Run the following command inside the backend directory to test the API endpoints:

npm test  

## 🐳 Docker Instructions

Navigate to the backend project directory  amazon-clone-backend-main\amazon-clone-backend-main   

Use the following command to build and run the backend Docker containers:

`docker-compose up --build`  

Backend Services will be accessible at urls : 

users-service : `http://localhost:8001`

inventory-service : `http://localhost:8002`

orders-service : `http://localhost:8003`

## 🌟 Why This Project Stands Out

Scalability: With Kafka, the app is designed to handle heavy traffic and asynchronous processes efficiently.

Robust Testing: Ensures high-quality APIs with Jest testing.

Cross-Environment Flexibility: Docker containers simplify deployment across development, staging, and production environments.

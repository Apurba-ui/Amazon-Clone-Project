// import axios from "axios";

// const instance = axios.create({
//   baseURL: 'http://localhost:8000',
// });

// export default instance;


import axios from "axios";

const usersService = axios.create({
  baseURL: "http://localhost:8001", // Microservice 1
});

const inventoryService = axios.create({
  baseURL: "http://localhost:8002", // Microservice 2
});

const ordersService = axios.create({
  baseURL: "http://localhost:8003", // Microservice 3
});

export { usersService, inventoryService, ordersService };

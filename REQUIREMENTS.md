# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

localhost:3000/api

#### Products

- Get All Products : `path : /products` , method : [GET], **list out all of the products are available in project**
- Get Product by id: `path: /products/:id` , method : [GET], **list out product by using product id**
- Create [token required] {
  `path: /products`
  method : [POST]
  require Token : true
  **create new product**
  }

#### Users

- Get All Users [token required] {
  `path : /users`
  method : [GET]
  require token : true
  **Get list of users in project**
  }
- Get User by id [token required] {
  `path: /users/:id`
  method : [GET]
  require token : true
  **Get user info with user id**
  }
- Create [token required]{
  `path : /users`
  method: [POST]
  require Token : true
  **create new user in the project with token required**
  }
- Login {
  `path :user/authenticate`
  method: [POST]
  require token : false
  **Allow user to login and then get the token**
  }

#### Orders

- update Order status {
  `path : /orders/:id`
  method: [PUT],
  token require: true
  **update status of order from active to complete**
  }
- create Order {
  `path : /orders`
  method:[POST]
  token require : true
  **allow user to create order**
  }
- Get list of Orders {
  `path : /orders`
  method : [GET]
  token require : true
  **Get list of all orders**
  }
- Get order by id {
  `path : /orders/:id`
  method : [GET]
  token require : true
  **Get list of all orders**
  }

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY,
- name VARCHAR(50),
- price DOUBLE PRECISION,
- category VARCHAR(50)

#### User

- id SERIAL PRIMARY KEY,
- email VARCHAR(50) UNIQUE,
- user_name VARCHAR(50) NOT NULL,
- first_name VARCHAR(50) NOT NULL,
- last_name VARCHAR(50) NOT NULL,
- password VARCHAR(250) NOT NULL

#### Orders

- id SERIAL PRIMARY KEY,
- product_id integer ,
- user_id integer,
- quantity integer,
- status VARCHAR(50),

You need to install dependencies of project by using npm i

create a postgres local name called : postgres, username: postgres , password : 123 or you can create another user using this account. In my case, I created new database with name called: udacity. Account I used is : username: postgres , password: 123 (following by env above)

then, create required databases , both have the same account to login :

database for dev : using SQL : CREATE DATABASE udacity_store;
database for test : using SQL : CREATE DATABASE udacity_store_dev;

To see the testing , please run npm run test and review the out put of testing 

To run the application with dev mode, please try with npm run watch will start the dev and use postman to test endpoints.

PORT that backend running is on localhost:3000 and db is localhost:5432

Environment variable are :
PORT = 3000
DB_ENV = test

POSTGRES_HOST = localhost
POSTGRES_PORT = 5434
POSTGRES_DB = udacity_store
POSTGRES_DB_TEST = udacity_store_dev
POSTGRES_USER = postgres
POSTGRES_PASSWORD = 123
BCRYPT_PASSWORD=123
SALT_ROUNDS=10
TOKEN_SECRET=123

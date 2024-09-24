CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price DOUBLE PRECISION,
    category VARCHAR(50)
);
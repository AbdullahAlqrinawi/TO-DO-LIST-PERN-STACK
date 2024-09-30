CREATE TABLE users (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,  
    email VARCHAR(255) UNIQUE NOT NULL,  
    password VARCHAR(255) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);



CREATE TABLE notes (
    id SERIAL PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,  
    content TEXT NOT NULL,  
    is_star BOOLEAN DEFAULT FALSE,  
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    due_date DATE NOT NULL  
);
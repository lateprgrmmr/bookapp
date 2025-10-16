CREATE TABLE
    book (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_date DATE,
        isbn VARCHAR(13) UNIQUE,
        pages INT,
        cover_url VARCHAR(255),
        language VARCHAR(50)
    );
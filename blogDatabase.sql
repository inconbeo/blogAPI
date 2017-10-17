CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email_address text NOT NULL,
    screen_name text NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    author_id INT REFERENCES users ON DELETE RESTRICT,
    published timestamp DEFAULT now()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag TEXT NOT NULL
);

CREATE TABLE post_tags (
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id)ON DELETE RESTRICT,
    PRIMARY KEY (post_id, tage_id)
)

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
    post_id INT REFERENCES posts ON DELETE CASCADE NOT NULL,
    comment_text TEXT,
    referring_comment_id INT,
    FOREIGN KEY (referring_comment_id) REFERENCES comments(id) ON DELETE SET NULL
);



INSERT INTO users (email, screen_name) 
    VALUES ('qtn2@njit.edu', 'inconbeo'),
           ('jesse@gmail.com', 'xyz');

INSERT INTO tags (tag) 
    VALUES ('x'), ('y'), ('z');

INSERT INTO posts (title, content, author_id) VALUES
    ('5 things about you', 'lorem etc etc', 1),
    ('10 things about me', 'lorem etc etc', 1);
INSERT INTO post_tags (post_id, tag_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 3);

INSERT INTO comments (author_id, post_id) VALUES
    (2, 1),
    (3, 2);

INSERT INTO comments (author_id, post_id, referring_comment_id) VALUES
    (3, 1, 1),
    (2, 1, 2);


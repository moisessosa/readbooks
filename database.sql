-- Todas mis tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema='public' 
AND table_type='BASE TABLE';

SELECT tablename FROM pg_catalog.pg_tables where tableowner ='txbuvcon';-- nombre de la DB
-- describir
select column_name, data_type, is_nullable from information_schema.columns where table_name = ''--nombre de la tabla

CREATE TABLE users(
    id_user SERIAL UNIQUE PRIMARY KEY,
    dni VARCHAR(50) NOT NULL,
    name1 VARCHAR(100) NOT NULL,
    name2 VARCHAR(100),
    last_name1 VARCHAR(100) NOT NULL,
    last_name2 VARCHAR(100) NOT NULL,
    nick_name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(200)UNIQUE NOT NULL,
    date_birth TIMESTAMP NOT NULL,
    date_register TIMESTAMP,
    country VARCHAR(50),
    address TEXT
);
ALTER TABLE users --altere porque esqueci a coluna para password
ADD COLUMN password VARCHAR(250);
ALTER TABLE users ALTER password SET NOT NULL;
CREATE TABLE books(
    id_book SERIAL UNIQUE PRIMARY KEY, 
    title VARCHAR(250),
    gener1 VARCHAR(50),
    gener2 VARCHAR(50),
    descrip TEXT,
    date_public TIMESTAMP,
    date_end TIMESTAMP,
    reading_num INT,
    id_user INT,
    CONSTRAINT fk_users_id_user FOREIGN KEY(id_user)
        REFERENCES users(id_user)
);
 
CREATE TABLE chapters(
    id_chapter SERIAL UNIQUE PRIMARY KEY,
    id_book INT NOT NULL,
    chapter_number INT NOT NULL,
    chapter_name VARCHAR(250),
    content TEXT,
    publication_date TIMESTAMP,
    update_date TIMESTAMP,
    likes INT,
    CONSTRAINT fk_books_id_book FOREIGN KEY (id_book)
      REFERENCES books(id_book)
);

CREATE TABLE comments(
    id_comment SERIAL UNIQUE PRIMARY KEY,
    id_user INT NOT NULL,
    id_book INT NOT NULL,
    id_chapter INT NOT NULL,
    comment TEXT,
    update_date TIMESTAMP,
    -- foregin keys
    CONSTRAINT fk_users_id_user FOREIGN KEY (id_user)
      REFERENCES users(id_user),
    CONSTRAINT fk_books_id_book FOREIGN KEY (id_book)
      REFERENCES books(id_book),
    CONSTRAINT fk_chapters_id_chapter FOREIGN KEY (id_chapter)
      REFERENCES chapters(id_chapter)
);
CREATE TABLE scores_book(
    id_score_book SERIAL UNIQUE PRIMARY KEY,
    id_user INT,
    id_book INT,
    score INT,
    note VARCHAR(50),
    CONSTRAINT fk_users_id_user FOREIGN KEY (id_user)
        REFERENCES users(id_user),
    CONSTRAINT fk_books_id_book FOREIGN KEY(id_book)
        REFERENCES books(id_book)
    );
CREATE TABLE scores_chapter(
    id_score_chapter SERIAL UNIQUE PRIMARY KEY,
    id_user INT,
    id_book INT,
    id_chapter INT,
    score INT,
    note VARCHAR(50),
    CONSTRAINT fk_users_id_user FOREIGN KEY (id_user)
        REFERENCES users(id_user),
    CONSTRAINT fk_books_id_book FOREIGN KEY(id_book)
        REFERENCES books(id_book),
    CONSTRAINT fk_chapters_id_chapter FOREIGN KEY(id_chapter)
        REFERENCES chapters (id_chapter)
    );

    -- tenho que cria a tabla followers?
CREATE TABLE subscriptions(
    id_subscrition SERIAL UNIQUE PRIMARY key,
    id_user INT,--subcritor
    id_author INT,--escritor al que se subcribieron
    subscription_type INT,
    date_begin TIMESTAMP,
    date_end TIMESTAMP,
    automatic_renewal BOOLEAN,
    CONSTRAINT fk_users_id_user FOREIGN KEY (id_user)
        REFERENCES users(id_user),
    CONSTRAINT fk_users_id_author FOREIGN KEY (id_author)
        REFERENCES users(id_user)

);
CREATE TABLE payments_subscripters(
    id_payment SERIAL UNIQUE PRIMARY KEY,
    id_author INT,
    id_subscriber INT, 
    amount NUMERIC(10,2),
    method_pay INT,
    state_ INT,
    CONSTRAINT fk_users_id_author FOREIGN KEY (id_author)
        REFERENCES users(id_user),
    CONSTRAINT fk_users_id_subscriber FOREIGN KEY (id_subscriber)
        REFERENCES users(id_user)
    );
CREATE TABLE wallets(
    id_user INT,
    wallet VARCHAR(100),
    user_wallet_name VARCHAR(250),
    user_wallet_other_data VARCHAR(250),
    CONSTRAINT fk_users_id_user FOREIGN KEY (id_user)
        REFERENCES users(id_user)
);--user.model 

CONSTRAINT fk_nombreTabla_nombreID FOREIGN KEY (nombreID)
      REFERENCES nombreTabla (nombreID)
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer default 0
);

INSERT INTO blogs(author, url, title) VALUES ('Herge', 'https://www.amazon.com/Adventures-Tintin-Complete-Collection/dp/0316495042/ref=sr_1_2?keywords=tin+tin&qid=1642491648&sr=8-2',  'The Adventures of Tintin: The Complete Collection');

INSERT INTO blogs(author, url, title) VALUES ('Wajahat Ali', 'https://medium.com/@wajahatmali/i-have-a-dream-republicans-stop-using-mlk-as-a-cover-for-their-racism-2c239b9add93',  'I HAVE A DREAM REPUBLICANS STOP USING MLK AS A COVER FOR THEIR RACISM');
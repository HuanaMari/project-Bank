-- CREATE TABLE branch (
-- branch_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- name VARCHAR (20) NOT NULL,
-- city VARCHAR (20) NOT NULL,
-- assets INT(20) NOT NULL
-- );
-- select * from branch;


-- CREATE TABLE account (
-- account_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- account_number BIGINT NOT NULL,
-- createdOn datetime NOT NULL,
-- balance INT(20),
-- branchId INT,
-- FOREIGN KEY (branchId)
-- REFERENCES branch(branch_id) 
--  ON DELETE CASCADE
-- );


-- CREATE TABLE customer (
-- customer_id INT PRIMARY KEY AUTO_INCREMENT,
-- name VARCHAR (20),
-- surname VARCHAR (20),
-- city VARCHAR(20),
-- adress VARCHAR(20),
-- accountId INT,
-- FOREIGN KEY (accountId) REFERENCES account(account_id)
--  ON DELETE CASCADE,
-- username VARCHAR(50),
-- password VARCHAR(50) 
-- );


-- CREATE TABLE employee (
-- employee_id INT(6) PRIMARY KEY AUTO_INCREMENT,
-- name VARCHAR (20),
-- surname VARCHAR (20),
-- branchId INT,
-- FOREIGN KEY (branchId) REFERENCES branch(branch_id)
-- );

-- CREATE TABLE loan (
-- loan_id INT(15) PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- borrowedOn datetime NOT NULL,
-- amount INT(20) NOT NULL,
-- accountId INT,
-- FOREIGN KEY (accountId)
-- REFERENCES account(account_id)
--  ON DELETE CASCADE,
-- customerId INT,
-- FOREIGN KEY (CustomerId) 
-- REFERENCES customer(customer_id)
--  ON DELETE CASCADE,
-- employeeId INT,
-- FOREIGN KEY (employeeId) 
-- REFERENCES employee(employee_id)
--  ON DELETE CASCADE
-- );







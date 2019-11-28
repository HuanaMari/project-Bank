ALTER TABLE customer 
ADD COLUMN email VARCHAR(50) AFTER accountId;

select * from customer;

select customer_id,customer.name, customer.surname,customer.accountId,account.account_id,account.account_number
FROM account JOIN customer ON customer.accountId = account.account_id;

alter table customer ADD UNIQUE (email);
UPDATE  customer SET email = "adelaida",username = "adelaida",password = "adelaida" WHERE customer_id = 1;
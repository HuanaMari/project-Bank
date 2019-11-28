INSERT INTO loan (borrowedOn,amount,accountId,customerId,employeeId)
VALUES 
(now(),184500,2,3,4),
(now(),184500,4,2,4),
(now(),922500,5,9,4),
(now(),153700,9,5,2),
(now(),215250,11,4,1);

select * from branch;

INSERT INTO employee (name,surname,branchId)
VALUES ("Sophia","White",1),
("Ethan","Walker",1),
("Noah","King",1),
("Matilda","Thompson",1),
("Poppy","Anderson",1);

INSERT INTO customer (name,surname,city,adress,accountId)
VALUES
("Adelaide","Kelly","Perth","William Street",7),
("Merindah","Robinson","Sydney","Abattoir Street",4),
("Voss","Walker","Sydney","Zorro Drive",2),
("Lowan","Anderson","Townsville","Abba Road",11),
("Anzac","King","Melbourne","Wolverene Street",9),
("Maroochy","Turner","Albany","Yoga Street",6),
("Kiara","Williams","Melbourne","Wolverene Street",1),
("Banjo","Smith","Sydney","Victoria Street",3),
("Luka","Taylor","Melbourne","John Street",5),
("Victoria","Jones","Sydney","Short Street",8);





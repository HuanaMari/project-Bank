select * from loan join transaction on loan.accountId=transaction.accountId;
SELECT SUM(transaction_amount) AS TotalTransaction_amount FROM transaction;
SELECT SUM(transaction_amount) AS TotalTransaction_amount into @total FROM transaction;
select @total;
  
 select loan.amount,
(loan.amount-@total) as remaining
from loan inner join transaction where loan.accountId=2;

SELECT loan.loan_id,loan.amount,transaction.transaction_amount, SUM(transaction.transaction_amount) AS TotalTransaction_amount , (loan.amount- SUM(transaction.transaction_amount)) as "Remains" FROM loan
INNER JOIN transaction
ON loan.accountId=transaction.accountId;

-- SELECT @last_id := MAX(loan_id) FROM loan into @posledno;
-- select @posledno;

-- SELECT * FROM table WHERE id = @last_id;

-- select loan.loan_id order by loan_id desc limit 1 into @test ;
-- SELECT loan_id FROM loan ORDER BY loan_id DESC LIMIT 1 into @test;
-- select @test;
select * from loan;
select * from transaction;
insert into transaction(transaction_amount,transaction_madeOn,accountId)
values(3600,now(),20);



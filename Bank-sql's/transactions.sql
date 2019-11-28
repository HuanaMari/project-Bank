select * from loan join transaction on loan.accountId=transaction.accountId;
SELECT SUM(transaction_amount) AS TotalTransaction_amount FROM transaction;

 select loan.amount,
(loan.amount-transaction.transaction_amount) as remaining
from loan inner join transaction on loan.accountId=transaction.accountId;

-- select members.name,
--        curr.date as curr_date,
--        curr.weight as curr_weight,
--        prev.weight as prev_weight,
--        curr.weight - prev.weight as weight_change
--   from members
--   join measurements curr
--     on members.id = curr.idmember
--   join measurements prev
--     on members.id = prev.idmember
--  where prev.date = (select max(x.date)
--                       from measurements x
--                      where x.idmember = prev.idmember
--                        and x.date < curr.date)
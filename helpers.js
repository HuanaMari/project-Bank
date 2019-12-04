jsonLeshi = (obj,balance) => {
    let arr = [];
    let transactions=[];
    obj.forEach(e => {
        temp = {
            Name:e.name,
            Surname:e.surname,
            Account:e.account_number,
            Created:e.createdOn,
            Transactions: transactions,
            Balance:  balance         
        }
        arr.push(temp)
    });
obj.forEach((x,i)=>{
   arr[i].Transactions.push(x.transaction_amount);
});
    return arr
}

module.exports = {
    jsonLeshi
}
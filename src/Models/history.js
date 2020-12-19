const db = require('../Configs/db');
const history = {};

history.get= () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM public.history ORDER BY id ASC")
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('History not found');
          } else {
            resolve(res.rows);
          };
        })
        .catch((err) => {
          reject("Data not found");
        });
    });
  };

history.add = (data) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO public.history(invoice, cashier, orders, amount, date) VALUES (${data.invoice}, '${data.cashier}', '${data.orders}', ${data.amount}, '${data.date}')`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            reject("Data not completed")
        });
    });
};

history.update = (data) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE public.history SET invoice=${data.invoice}, cashier='${data.cashier}', orders='${data.orders}', amount=${data.amount}, date='${data.date}' WHERE id=${data.id}`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            reject("Data not completed")
        });
    });
};


history.del= (id) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM public.history WHERE id=${id}`)
        .then((res) => {
            resolve(id)
        })
        .catch((err) => {
            reject("id not found")
        });
    });
};

module.exports = history;


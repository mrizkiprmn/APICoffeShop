const db = require('../Configs/db');
const categories = {};


categories.get = () =>{
    return new Promise((resolve, reject) =>{
        db.query("SELECT * FROM public.category ORDER BY id ASC")
        .then((res) => {
            if (res.rows.length == 0) {
                resolve("Categories is empty!");
            } else {
                resolve(res.rows);
            };
        })
        .catch((err) => {
            reject("Data not found");
        });
    });
};

categories.add = (data) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO public.category(name) VALUES ('${data.name}')`)
        .then((res) => {
            resolve(data);
        })
        .catch((err) => {
            reject("Input Categories!");
        });
    });
};

categories.update = (data) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE public.category SET name='${data.name}' WHERE id=${data.id}`)
        .then((res) => {
            resolve(data);
        })
        .catch((err) => {
            reject("Data not completed");
        });
    });
};


categories.del = (id) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM public.category WHERE id=${id}`)
        .then((res) => {
            resolve(id);
        })
        .catch((err) => {
            reject("id not found");
        });
    });
};

module.exports = categories;




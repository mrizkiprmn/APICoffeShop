const db = require("../Configs/db");
const users = {};

users.getAll= () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM public.users ORDER BY id ASC")
        .then((res) => {
          resolve(res.rows)
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


users.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users WHERE email='${email}'`)
        .then((res) => {
          resolve(res.rows)
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  users.getByUserName = (username) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users WHERE username='${username}'`)
        .then((res) => {
          resolve(res.rows)
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  users.getByRole= (role) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users WHERE role='${role}'`)
        .then((res) => {
          resolve(res.rows)
        })
        .catch((err) => {
          reject(err);
        });
    });
  };



users.add = (data) =>{
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users(username, email, password, role) VALUES ('${data.username}', '${data.email}', '${data.password}', '${data.role}')`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            reject("Data not completed")
        });
    });
};

users.update = (data) =>{
  return new Promise((resolve, reject) => {
      db.query(`UPDATE public.users SET username='${data.username}', email='${data.email}', password='${data.password}' WHERE id=${data.id}`)
      .then((res) => {
        console.log("masuk model")
          resolve(data)
      })
      .catch((err) => {
          reject("Check Data")
      });
  });
};

users.del = (id) =>{
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.users WHERE id=${id}`)
        .then((res) => {
            resolve(id);
        })
        .catch((err) => {
            reject("id not found");
        });
    });
};

  
module.exports = users;


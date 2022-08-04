const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yasar1234",
  database: "management_user"
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home.html', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


exports.form = (req, res) => {
  res.render('add-user.html');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  // User the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?', [first_name, last_name, email, phone], (err, rows) => {
    if (!err) {
      res.render('add-user.html', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      console.log(rows[0].id)
      res.render('edit-user.html', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?', [first_name, last_name, email, phone, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);

  });

}

// View Users
exports.viewUser = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user.html', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}
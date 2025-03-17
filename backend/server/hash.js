const bcrypt = require('bcrypt');

console.log("Starting hash generation...");

bcrypt.hash('Admin123!', 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});

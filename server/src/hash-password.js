/**
 * Utility: generate a bcrypt hash for a new admin password.
 * Usage:  node src/hash-password.js "YourNewPassword"
 * Paste the printed hash into .env as ADMIN_PASSWORD_HASH, then restart the server.
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node src/hash-password.js "YourNewPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n');

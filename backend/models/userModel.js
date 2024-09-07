
const pool = require('../config/db');

const createUser = async (username, password, email) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};


const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    throw new Error('Error finding user by email: ' + error.message);
  }
};

const findUserByUsername = async (username) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  } catch (error) {
    throw new Error('Error finding user: ' + error.message);
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error finding user by ID: ' + error.message);
  }
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  findUserByEmail
};

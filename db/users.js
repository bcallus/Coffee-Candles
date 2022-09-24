const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, password }) {

	const SALT_COUNT = 10;

	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	try {
		const { rows: [user] } = await client.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [email, hashedPassword]
		);
		delete user.password; 
		// add in createCart(user)?
		return user;
	} catch (error) {
		throw error;
	}
}

//getUser ?? do we need this

//getUserById
async function getUserById(userId) {
	try {
		const user = await client.query(`
      SELECT id, email
      FROM users
      WHERE id=${userId}
    `);
		
		const returnedUser = user.rows[0];
		return returnedUser;
	} catch (error) {
		throw error;
	}
}

//getUserByEmail
async function getUserByEmail(email) {
	
	try {
		const user = await client.query(
			`
      SELECT id, email, password
      FROM users
	  WHERE email = $1
    `,
			[email]
		);
		const returnedUser = user.rows[0];
		return returnedUser;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createUser,
	getUserByEmail,
	getUserById
};
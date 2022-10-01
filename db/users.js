const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, password, isAdmin}) {

	const SALT_COUNT = 10;

	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	try {
		const { rows: [user] } = await client.query(`
            INSERT INTO users (email, password, "isAdmin")
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [email, hashedPassword, isAdmin]
		);
		delete user.password; 
		// add in createCart(user)?
		return user;
	} catch (error) {
		throw error;
	}
}

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
      SELECT id, email, password, "isAdmin"
      FROM users
	  WHERE email = $1
    `,
			[email]
		);
		const returnedUser = user.rows[0];
		console.log({ returnedUser, line:56 })
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
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
		return user;
	} catch (error) {
		throw error;
	}

}

module.exports = {
	createUser
};
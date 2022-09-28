//front end api calls
export const APIURL = "/api";

export async function fetchAllProducts() {
	try {
		return await fetch(`${APIURL}/products`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}


export async function createNewOrder({ productId, cartId, quantity, price }) {
	try {
		return fetch(`${APIURL}/products/${productId}`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: 1,
				cartId: 2,
				quantity: 1,
				price: 25
			}),
		  })
			.then((response) => response.json())
			.then((result) => {
				console.log({result, line:31})
			  return result;
			});
	}
	catch (error) {
		console.error(error)
	}
}

export async function createNewCart({ token, cartId }) {
	try {
		return fetch(`${APIURL}/products`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				cartId: 2,
			}),
		  })
			.then((response) => response.json())
			.then((result) => {
			console.log({result, line:59})
			return result;
			});
	}
	catch (error) {
		console.error(error)
	}
}
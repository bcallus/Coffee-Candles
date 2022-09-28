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

export async function createNewCart({ token, email, isPurchased = false }) {
	try {
        return fetch(`${APIURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
				email: email,
				isPurchased: isPurchased,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
            return result;
            });
    }
    catch (error) {
        console.error(error)
    }
}

//this is where you send data to the server in request body 

export async function createNewOrder(token, productId) {
    try {
        return fetch(`${APIURL}/products/${productId}`,  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
				productId: productId,
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

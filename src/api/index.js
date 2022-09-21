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
export default async function APIfetchData(url) {
	const response = await fetch(url, {
		headers: { credentials: true, 'Access-Control-Allow-Origin`': '*' },
	});
	return response.json();
}

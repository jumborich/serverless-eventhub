// Handler for showing all events
module.exports.handler = async (event) => {
	try {
		console.log('Received event:', JSON.stringify(event, null, 2));
		return {
			statusCode: 200,
			body: "Success!",
		};
	} catch (error) {
		console.error('Error getting events:', error);
		return {
			statusCode: 500,
			body: "Server error while getting events.",
		};
	}
}
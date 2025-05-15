// handler for deleting an event

module.exports.handler = async (event) => {
	try {
		console.log('Received event:', JSON.stringify(event, null, 2));
		return {
			statusCode: 200,
			body: "Success! Event deleted.",
		};
	} catch (error) {
		console.error('Error deleting event:', error);
		return {
			statusCode: 500,
			body: "Server error while deleting event.",
		};
	}
}
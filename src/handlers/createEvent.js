// Handler to create an event

module.exports.handler = async (event) => {
	try {
		console.log('Received event:', JSON.stringify(event, null, 2));
		return {
			statusCode: 201,
			body: "Success! Event created.",
		};
	} catch (error) {
		console.error('Error creating event:', error);
		return {
			statusCode: 500,
			body: "Server error while creating event.",
		};
	}
}
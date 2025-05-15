
/** As per business rules, every event created should be cleaned from DB after 1 week. */
exports.getEventTTL = () => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const oneWeekInSeconds = 7 * 24 * 60 * 60;
  const expiresAt = nowInSeconds + oneWeekInSeconds;
  return expiresAt;
}

exports.sendFinalResponse = (responseObject) => {
  console.log("Lambda Final Response:", JSON.stringify(responseObject));
  return responseObject;
}
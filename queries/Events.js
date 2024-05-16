const db = require("../db/dbConfig");
const getEvents = async (id) => {
  try {
    const foundEvent = await db.any(
      `SELECT * FROM events WHERE id=$1 RETURNING *`,
      id
    );
    return foundEvent;
  } catch (error) {
    return error;
  }
};
const deleteEvent = async (id) => {
  try {
    const deletedEvent = await db.one(
      `DELETE FROM events WHERE id=$1 RETURNING *`,
      [id]
    );
    return deletedEvent;
  } catch (error) {
    return error;
  }
};

module.exports = { getEvents, deleteEvent };

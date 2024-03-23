const db = require("../db/dbConfig");

const grabFriendProfile = async (id) => {
  try {
    const foundFriendData = await db.one(
      `SELECT user_picture, user_name, first_name, last_name, email, dob WHERE user_id=$1`,
      id
    );

    if (!foundFriendData.user_name) {
      return { error: "Friend could not be found" };
    }
    const friendsWishlist = await db.any(
      `SELECT * FROM wishlist WHERE user_id=$1 ORDER BY title ASC`,
      id
    );

    return { foundFriendData, friendsWishlist };
  } catch (error) {}
};

const addNewFriend = async (user_id, friend_id) => {
  try {
    const addedFriend = await db.any(
      `INSERT INTO friends_list(user_id, friends_id) VALUES($1,$2),($2,$1) RETURNING *`,
      [user_id, friend_id]
    );
    return addedFriend;
  } catch (error) {}
};
const deleteFriendFriendsList = async (user_id, friend_id) => {
  try {
    const deletedFriend = await db.any(
      `DELETE FROM friends_list WHERE user_id=$1 AND friends_id=$2 RETURNING *`,
      [user_id, friend_id]
    );
    return deletedFriend;
  } catch (error) {}
};

module.exports = { grabFriendProfile, addNewFriend, deleteFriendFriendsList };

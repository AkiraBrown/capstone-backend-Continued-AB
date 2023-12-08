const db = require("../db/dbConfig");

// GET USER PROFILE
const getUserProfile = async (id) => {
  // user shown in nav
  const user = await db.one("SELECT * FROM users WHERE id=$1", id);
  return user;
};

const getFriendsAndTheirWishlists = async (id) => {
  // Friends
  const requests = await db.any(
    "SELECT * FROM friends_list WHERE user_id=$1 OR friends_id=$1",
    id
  );
  // comparing to confirm friendship
  let usersRequest = requests
    .filter((userRequest) => userRequest.user_id === Number(id))
    .map((request) => request.friends_id);

  let friendsRequest = requests
    .filter((friendRequest) => friendRequest.friends_id === Number(id))
    .map((request) => request.user_id);

  // friendship confirmed and pushed into array for Friends list
  let connectionIds = [];
  for (let requestId of usersRequest) {
    if (friendsRequest.includes(requestId)) {
      connectionIds.push(requestId);
    }
  }

  // Ordering friends list by DOB
  let userConnections = await db.any(
    "SELECT * FROM users WHERE id in ($1:csv) ORDER BY dob ASC",
    [connectionIds]
  );

  // Grabbing friends' wishlists by user_id
  for (let connection of userConnections) {
    let wishlist = await db.any(
      "SELECT * FROM wishlist WHERE user_id=$1",
      connection.id
    );
    connection.wishlist = wishlist;
  }

  return userConnections;
};

const getAllFriendsFromUser = async (id) => {
  try {
    const allFriendsFromUser = await db.any(
      `SELECT * FROM users 
          INNER JOIN FRIENDS_LIST  
          ON FRIENDS_LIST.user_id = users.id
          WHERE FRIENDS_LIST.friends_id = $1`,
      id
    );
    return allFriendsFromUser;
  } catch (error) {
    return error;
  }
};

const getWishlistById = async (id) => {
  try {
    const FriendWishlist = await db.any(
      `SELECT * FROM wishlist WHERE user_id=$1 ORDER BY item_name ASC`,
      id
    );

    return FriendWishlist;
  } catch (err) {
    return err;
  }
};

const deleteFriendEntryFriendsList = async (user_id, friend_id) => {
  try {
    const deletedFriend = await db.one(
      `DELETE FROM friends_list WHERE user_id=$1 AND friends_id=$2 RETURNING *`,
      [user_id, friend_id]
    );
    return deletedFriend;
  } catch (error) {
    return error;
  }
};

const updateItemBoughtByItemId = async (id, is_bought) => {
  try {
    const updatedWishlist = await db.one(
      `UPDATE wishlist SET is_bought=$1 WHERE id = $2 RETURNING *`,
      [is_bought, id]
    );
    return updatedWishlist;
  } catch (error) {
    return error;
  }
};

const addFriendEntryFriendsList = async (user_id, friend_id) => {
  try {
    const addedFriend = await db.one(
      `INSERT INTO friends_list(user_id, friends_id) VALUES ($1, $2) RETURNING *`,
      [user_id, friend_id]
    );
    return addedFriend;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUserProfile,
  getAllFriendsFromUser,
  getFriendsAndTheirWishlists,
  getWishlistById,
  deleteFriendEntryFriendsList,
  updateItemBoughtByItemId,
  addFriendEntryFriendsList,
};

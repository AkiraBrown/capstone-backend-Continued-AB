const db = require("../db/dbConfig");

const createWishlistItem = async (data) => {
  const {
    user_id,
    title,
    link,
    product_link,
    product_id,
    source,
    price,
    thumbnail,
    delivery,
  } = data;
  try {
    const addedItem = await db.one(
      "INSERT INTO wishlist(user_id,title,link,product_link,product_id,source,price,thumbnail,delivery,is_bought) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        user_id,
        title,
        link,
        product_link,
        product_id,
        source,
        price,
        thumbnail,
        delivery,
        false,
      ]
    );
    return addedItem;
  } catch (error) {
    return error;
  }
};

const deleteWishlistItem = async (id) => {
  try {
    const deleteditem = await db.one(
      `DELETE FROM wishlist WHERE id=$1 RETURNING *`,
      id
    );
    return deleteditem;
  } catch (error) {
    return error;
  }
};

const updateWishlistItem = async (id, is_bought) => {
  try {
    const updatedWishlist = await db.one(
      "UPDATE wishlist SET is_bought=$1 WHERE id=$2 RETURNING *",
      [is_bought, id]
    );
    return updatedWishlist;
  } catch (error) {
    return error;
  }
};

const getUserWishlistItems = async (id) => {
  try {
    const foundWishlist = await db.any(
      `SELECT * FROM wishlist WHERE user_id=$1 RETURNING *`,
      id
    );
    return foundWishlist;
  } catch (error) {
    return error;
  }
};
module.exports = {
  createWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
  getUserWishlistItems,
};

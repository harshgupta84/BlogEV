import useUserStore from "@/store/userStore";
import axios from "axios";

const BASE_URL = "http://localhost:3000/bookmarks";

// Fetch all bookmarks for the logged-in user
export const fetchBookmarks = async () => {
  const { token } = useUserStore.getState();

  if (!token) {
    console.error("No token found. User not authenticated.");
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookmarks", error);
    return [];
  }
};

// Add a new bookmark
export const addBookmark = async (blogId) => {
  const { token } = useUserStore.getState();

  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await axios.post(`${BASE_URL}/${blogId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add bookmark", error);
    return null;
  }
};

// Remove a bookmark
export const removeBookmark = async (blogId) => {
  const { token } = useUserStore.getState();

  if (!token) {
    console.error("No token found. User not authenticated.");
    return false;
  }

  try {
    await axios.delete(`${BASE_URL}/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to remove bookmark", error);
    return false;
  }
};

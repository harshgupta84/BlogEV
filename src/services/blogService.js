import useUserStore from "@/store/userStore";
import axios from "axios";

export const addBlog = async (title, content, category) => {
  const { token } = useUserStore.getState();

  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/blog/post", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // Required for JSON payloads
      },
      body: JSON.stringify({ title, content, topics: category }), // Stringify body
    });

    if (!response.ok) {
      throw new Error("Failed to add blog");
    }

    const data = await response.json();
    return data; // Assuming the response contains the added blog
  } catch (error) {
    console.error("Error adding blog:", error);
    return null;
  }
};



export const getBlogById = async (id) => {
  const { token } = useUserStore.getState();

  try {
    const response = await axios.get(`http://localhost:3000/blog/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    
    return response.data; // Return the fetched blog
  } catch (error) {
    console.error("Error fetching blog by ID:", error.response?.data || error.message);
    return null;
  }
};




export const listBlogs = async() => {
  const {token} = useUserStore.getState();
 
  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await axios.get("http://localhost:3000/blog/myblogs", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    
    return response.data;
    
  } catch (error) {
    console.error("Error fetching user blogs:", error.response?.data || error.message);
    return null;
  }
};

export const listFeedBlogs = async() => {
  const {token} = useUserStore.getState();
 
  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await axios.get("http://localhost:3000/feed", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

   ;
    return response.data;
    
  } catch (error) {
    console.error("Error fetching user blogs:", error.response?.data || error.message);
    return null;
  }
};

export const updateBlog = async (id, updatedData) => {
  const { token } = useUserStore.getState();

  try {
    const response = await axios.post(`http://localhost:3000/blog/update/${id}`, {
      title: updatedData.title,
      content: updatedData.content,
      topics: updatedData.topics
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

   
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error.response?.data || error.message);
    throw error; // Throw error to handle it in the component
  }
};


export const deleteBlog = async (id) => {
  const { token } = useUserStore.getState();

  try {
    const response = await axios.delete(`http://localhost:3000/blog/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("Delete Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error.response?.data || error.message);
    throw error;
  }
};

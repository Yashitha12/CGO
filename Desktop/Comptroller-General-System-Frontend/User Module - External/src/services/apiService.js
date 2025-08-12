import axios from "axios";

// Base URL for your API
const apiClient = axios.create({
  baseURL: "http://192.168.231.28:8080/api/v1/InstitutionName",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the auth token if needed
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// 1. Create a new institute
export const createInstitute = async (instituteName) => {
  try {
    const response = await apiClient.post("/save", {
      
    });
    return response.data;
  } catch (error) {
    console.error("Error creating institute:", error.message);
    throw error;
  }
};

// // 2. Get all institutes
// export const getAllInstitutes = async () => {
//   try {
//     const response = await apiClient.get("/");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching institutes:", error.message);
//     throw error;
//   }
// };

// // 3. Delete institute by ID
// export const deleteInstitute = async (id) => {
//   try {
//     const response = await apiClient.delete(`/delete/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting institute:", error.message);
//     throw error;
//   }
// };

// // 4. Update institute by ID
// export const updateInstitute = async (id, newName) => {
//   try {
//     await apiClient.put(`/${id}`, {
//       name: newName,
//     });
//   } catch (error) {
//     console.error("Error updating institute:", error.message);
//     throw error;
//   }
// };

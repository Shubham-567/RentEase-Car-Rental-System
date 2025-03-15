import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

// fetch all users (admin only)
export const fetchAllUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

// fetch user profile
export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user profile.");
  }
};

// update user profile
export const updateUserProfile = async (
  token: string,
  userData: { name: string; phone: string }
) => {
  try {
    // console.log("token string: " + token);
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile.");
  }
};

// change user password
export const changeUserPassword = async (
  token: string,
  passwords: { oldPassword: string; newPassword: string }
) => {
  try {
    await axios.put(`${API_URL}/change-password`, passwords, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Failed to change password.");
  }
};

// fetch user booking history
export const fetchUserBookings = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user bookings.");
  }
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

import { User, Mail, Phone, Lock, Pencil, Save, X, LogOut } from "lucide-react";
import MyBookings from "../components/Bookings/MyBookings";

const Profile = () => {
  const navigate = useNavigate();

  const { user, loadUserProfile, updateUser, changePassword } = useUserStore();
  const { token, logout } = useAuthStore();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadUserProfile(token);
    }
  }, [token, loadUserProfile]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    await updateUser(token!, { name, phone });
    alert("Profile updated!");
    setEditMode(false);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Both Old Password and New Password are required.");
      return;
    }

    if (oldPassword === newPassword) {
      alert("New password must be different from the old password.");
      return;
    }

    try {
      await changePassword(token!, { oldPassword, newPassword });
      alert("Password changed successfully!");

      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert("Failed to change password. Please try again.");
    }
  };

  return (
    <div className='max-w-4xl mx-auto my-8 p-8 bg-background-50 shadow-xl rounded-2xl border border-gray-200'>
      <h2 className='text-3xl font-semibold text-text-900 flex items-center justify-center gap-2 mb-4'>
        <User size={26} className='text-accent-600' /> My Account
      </h2>
      {/* Profile & Settings Layout */}
      <div className='grid md:grid-cols-2 gap-8'>
        {/* Left: Profile Info */}
        <div className='bg-secondary-50 p-6 rounded-xl shadow-md border border-gray-200'>
          <h3 className='text-xl font-semibold text-text-900 flex items-center gap-2 mb-4'>
            <User size={26} className='text-accent-600' /> Personal Information
          </h3>

          {editMode ? (
            <div className='space-y-5'>
              {/* Name Input */}
              <div className='relative'>
                <User
                  size={18}
                  className='absolute left-3 top-3 text-accent-500'
                />
                <input
                  type='text'
                  value={name}
                  placeholder='Enter your name'
                  onChange={(e) => setName(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 bg-background-50 rounded-lg text-text-950 focus:ring-2 focus:ring-primary-500 focus:outline-none transition'
                />
              </div>

              {/* Phone Input */}
              <div className='relative'>
                <Phone
                  size={18}
                  className='absolute left-3 top-3 text-accent-500'
                />
                <input
                  type='text'
                  value={phone}
                  placeholder='Enter phone number'
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 bg-background-50 rounded-lg text-text-950 focus:ring-2 focus:ring-primary-500 focus:outline-none transition'
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  onClick={handleUpdateProfile}
                  className='flex items-center gap-2 px-5 py-2 bg-primary-500 text-white rounded-lg font-medium shadow-md transition-all hover:scale-105 hover:bg-primary-600 active:scale-95'>
                  <Save size={18} /> Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className='flex items-center gap-2 px-5 py-2 bg-gray-400 text-white rounded-lg font-medium shadow-md transition-all hover:scale-105 hover:bg-gray-500 active:scale-95'>
                  <X size={18} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-4 text-text-900'>
              <p className='flex items-center gap-2'>
                <User size={18} className='text-accent-500' /> {user?.name}
              </p>
              <p className='flex items-center gap-2'>
                <Mail size={18} className='text-accent-500' /> {user?.email}
              </p>
              <p className='flex items-center gap-2'>
                <Phone size={18} className='text-accent-500' /> {user?.phone}
              </p>

              <button
                onClick={() => setEditMode(true)}
                className='mt-3 flex items-center gap-2 px-5 py-2 bg-secondary-500 text-white rounded-lg font-medium shadow-md transition-all hover:scale-105 hover:bg-secondary-600 active:scale-95'>
                <Pencil size={18} /> Edit
              </button>
            </div>
          )}
        </div>

        {/* Right: Change Password */}
        <div className='bg-secondary-50 p-6 rounded-xl shadow-md border border-gray-200'>
          <h3 className='text-xl font-semibold text-text-900 flex items-center gap-2 mb-4'>
            <Lock size={22} className='text-accent-600' /> Change Password
          </h3>

          <div className='space-y-5'>
            {/* Old Password */}
            <div className='relative'>
              <Lock
                size={18}
                className='absolute left-3 top-3 text-accent-500'
              />
              <input
                type='password'
                placeholder='Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 bg-background-50 rounded-lg text-text-950 focus:ring-2 focus:ring-primary-500 focus:outline-none transition'
              />
            </div>

            {/* New Password */}
            <div className='relative'>
              <Lock
                size={18}
                className='absolute left-3 top-3 text-accent-500'
              />
              <input
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 bg-background-50 rounded-lg text-text-950 focus:ring-2 focus:ring-primary-500 focus:outline-none transition'
              />
            </div>

            <button
              onClick={handleChangePassword}
              className='w-full py-3 text-center bg-primary-500 text-white rounded-lg font-medium shadow-md transition-all hover:scale-102 hover:bg-primary-600 active:scale-95'>
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* My Bookings Section */}
      <MyBookings />

      {/* Logout Button */}
      <button
        onClick={logout}
        className='mt-6 flex items-center gap-2 px-5 py-3 w-full bg-red-500 text-white rounded-lg font-medium shadow-md transition-all hover:scale-101 hover:bg-red-600 active:scale-95'>
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default Profile;

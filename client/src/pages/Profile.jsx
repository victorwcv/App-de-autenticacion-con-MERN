import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        <input 
        defaultValue={currentUser.username}
        type="text" 
        name="username" 
        id="username"
        placeholder="Username"
        className="bg-gray-200 rounded-lg p-3"
        />
        <input 
        defaultValue={currentUser.email}
        type="email" 
        name="email" 
        id="email"
        placeholder="E-mail"
        className="bg-gray-200 rounded-lg p-3"
        />
        <input 
        type="password" 
        name="password" 
        id="password"
        placeholder="Password"
        className="bg-gray-200 rounded-lg p-3"
        />
        <button
        className="bg-gray-700 text-white p-3 rounded-xl  uppercase hover:opacity-95 disabled:opacity-80"
        >update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

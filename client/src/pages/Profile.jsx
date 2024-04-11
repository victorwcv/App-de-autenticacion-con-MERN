import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const profileImageInput = useRef(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 ">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex justify-center mt-2 relative">
          <input
            type="file"
            ref={profileImageInput}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src="/update.png"
            alt="update_icon"
            className="size-8 absolute right-[40%] bottom-0 cursor-pointer"
            onClick={() => profileImageInput.current.click()}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="object-cover h-24 w-24 self-center rounded-full shadow-md"
          />
        </div>
        <p className="min-h-7 self-center">
          {imageError ? (
            <span className="text-red-500">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-neutral-500">{`${imagePercent}% Uploaded...`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>

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
        <button className="bg-gray-700 text-white p-3 rounded-xl  uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

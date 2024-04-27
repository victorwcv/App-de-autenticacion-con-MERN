import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {

  // Retrieve user data from Redux store
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const profileImageInput = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Upload image when it's changed
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  // Handle file upload to Firebase Storage
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

  // Update form data on input change
  const handleFormChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure());
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };

  // Handle user signout
  const handleSignout = async () => {
    // sign out the current user by removing token from local storage
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-14">
      <h1 className="text-center text-3xl font-semibold my-7 ">
        Perfil de Usuario
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleFormSubmit}>
        <div className="flex justify-center mt-2 mx-auto size-32 relative">
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
            className="size-8 absolute right-0 bottom-0 cursor-pointer"
            onClick={() => profileImageInput.current.click()}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className=" rounded-full h-32 w-32 object-cover shadow-md "
          />
        </div>
        <p className="min-h-7 self-center">
          {imageError ? (
            <span className="text-red-500">Error cargando la imagen</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-neutral-500">{`${imagePercent}% Uploaded...`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-600">Imagen cargada exitosamente</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          name="username"
          id="username"
          placeholder="Nuevo nombre de usuario"
          className="bg-gray-200 rounded-lg p-3"
          onChange={handleFormChanges}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          name="email"
          id="email"
          placeholder="Nuevo correo electrónico"
          className="bg-gray-200 rounded-lg p-3"
          onChange={handleFormChanges}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Nueva contraseña"
          className="bg-gray-200 rounded-lg p-3"
          onChange={handleFormChanges}
        />
        <button className="bg-blue-500 text-white p-3 rounded-xl  uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "cargando..." : "actualizar"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-500 cursor-pointer"
        >
          Eliminar Cuenta
        </span>
        <span onClick={handleSignout} className="text-red-500 cursor-pointer">
          Cerrar Sesión
        </span>
      </div>
      <p className="text-red-500 mt-5">{error && "Algo salió mal!"}</p>
      <p className="text-green-600 mt-5">
        {updateSuccess && "Actualizado correctamente"}
      </p>
    </div>
  );
}

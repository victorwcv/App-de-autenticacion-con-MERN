import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

/* Define the OAuth component */
export default function OAuth() {

  /* Initialize useDispatch and useNavigate hooks */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Function to handle Google OAuth sign-in */
  const handleGoogleClick = async () => {
    try {
      /* Create GoogleAuthProvider instance */
      const provider = new GoogleAuthProvider();
      /* Get authentication instance from Firebase app */
      const auth = getAuth(app);
      /* Sign in with Google popup */
      const result = await signInWithPopup(auth, provider);
      /* Send user data to server for authentication */
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      /* Get response data */
      const data = await res.json();
      /* Dispatch signInSuccess action with user data */
      dispatch(signInSuccess(data));
      /* Navigate to home page */
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  /* Render button for Google OAuth */
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      continuar con google
    </button>
  );
}

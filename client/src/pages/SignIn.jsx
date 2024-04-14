import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-14">
      <h1 className="text-3xl text-center font-semibold my-7">
        Iniciar Sesión
      </h1>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* Input fields */}
        <input
          type="email"
          placeholder="Correo electrónico"
          id="email"
          className="bg-gray-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          id="password"
          className="bg-gray-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {/* Submit button */}
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
        {/* OAuth component */}
        <OAuth />
      </form>
      {/* Link to sign up page */}
      <div className="flex gap-4 my-4">
        <p>{"No tienes una cuenta?"}</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Registrarse</span>
        </Link>
      </div>
      {/* Error message display */}
      <p className="text-red-600 mt-5">
        {error ? error.message || "Somentrhing went wrong" : ""}
      </p>
    </div>
  );
}

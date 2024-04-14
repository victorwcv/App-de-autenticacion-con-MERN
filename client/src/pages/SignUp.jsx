import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    // Check if required fields are filled
    if (!formData.username || !formData.email || !formData.password) return;
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
       // Handle success or failure response
      if (data.succes === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  //66
  return (
    <div className="p-3 max-w-lg mx-auto mt-14">
      <h1 className="text-3xl text-center font-semibold my-7">Registrarse</h1>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
         {/* Input fields */}
        <input
          type="text"
          placeholder="Nombre de Usuario"
          id="username"
          className="bg-gray-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "Cargando..." : "crear cuenta"}
        </button>
        {/* OAuth component */}
        <OAuth />
      </form>
      {/* Link to sign in page */}
      <div className="flex gap-4 my-4">
        <p>Ya tienes una cuenta?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Iniciar Sesión</span>
        </Link>
      </div>
      {/* Error message display */}
      <p className="text-red-600 mt-5">{error && "Somentrhing went wrong"}</p>
    </div>
  );
}

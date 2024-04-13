export default function Home() {
  return (
    <div className="flex flex-col px-4 py-12 max-w-5xl mx-auto mt-14">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ¡Bienvenido a mi aplicación de autenticación segura!
      </h1>
      <div className="flex flex-wrap justify-center min-w-80  gap-6 items-center">
        <div className="flex flex-col max-w-screen-sm gap-6 my-8">
          <p>
            Construida con el stack MERN (MongoDB, Express, React y Node.js), mi
            aplicación ofrece una experiencia de autenticación robusta y
            escalable, con estilos cuidadosamente diseñados utilizando Tailwind
            CSS para una apariencia atractiva y consistente.
          </p>
          <p>
            Utilizo Redux Toolkit para una gestión de estado más eficiente y
            simplificada, asegurando una experiencia de usuario fluida y
            altamente interactiva. Además, implementé Persist Redux para
            garantizar que los datos de la sesión del usuario se conserven
            incluso después de recargar la página, ofreciendo una experiencia de
            usuario continua y sin interrupciones.
          </p>
          <p>
            La seguridad es una prioridad, por lo que implementé técnicas como
            bcryptjs para el hash de contraseñas y JSON Web Tokens (JWT) para la
            autenticación de usuarios. Además, permito a los usuarios iniciar
            sesión de forma segura con sus cuentas de Google gracias a Google
            OAuth.
          </p>
          <p>
            Firebase Storage se encarga de gestionar los archivos multimedia de
            los usuarios, garantizando un almacenamiento seguro y eficiente.
          </p>
        </div>
        <img className="size-80 mx-auto" src="secure.png" alt="secure icon" />
      </div>
    </div>
  );
}

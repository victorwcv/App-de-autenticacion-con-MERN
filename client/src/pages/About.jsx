export default function About() {
  return (
    <div className="flex flex-col px-4 py-12 max-w-5xl mx-auto mt-14">
      <h1 className="text-3xl font-bold mb-6  text-center">
        Cómo Utilizar
      </h1>
      <div className="flex flex-col gap-6 ">
        <p>
          ¡Bienvenido a mi proyecto de portafolio! Aquí tienes una guía rápida
          sobre cómo utilizar la aplicación de autenticación que he
          desarrollado:
        </p>
        <h2>🔐 Registro e Inicio de Sesión</h2>
        <p>
          Para comenzar, puedes registrarte como un nuevo usuario haciendo clic
          en la seccion "Registrarse" de la barra de navegacion. Si ya tienes
          una cuenta, simplemente inicia sesión utilizando tu dirección de
          correo electrónico y contraseña.
        </p>
        <h2>🛡️ Privacidad y Seguridad</h2>
        <p>
          Tu privacidad y seguridad son mi máxima prioridad. He implementado
          medidas de seguridad como el hash de contraseñas y la gestión segura
          de sesiones de usuario para garantizar la protección de tus datos
          personales.
        </p>
        <h2>🔄 Actualizar perfil</h2>
        <p>
          ¿Necesitas mantener tus datos de perfil al día? ¡No hay problema!
          Desde la sección de perfil de usuario, puedes actualizar tu nombre,
          correo electrónico y foto de perfil. Además, mi aplicación
          utiliza un sistema de almacenamiento integrado basado en Firebase
          Storage, lo que significa que puedes subir y cambiar tu foto de perfil
          con facilidad.
        </p>
        <h2>😊 ¡Disfruta de la Experiencia!</h2>
        <p>
          Esta aplicación fue desarrollada con pasión y dedicación para
          demostrar mis habilidades en el desarrollo de aplicaciones web
          modernas y seguras. Espero que disfrutes explorando todas las
          características que he implementado. Seguramente implementaré esta
          autenticacion en otros proyectos mas grandes.
        </p>
        <p>
          ¡Y eso es todo! Si tienes alguna pregunta o comentario, no dudes en
          contactarme. ¡Gracias por visitar mi proyecto de portafolio!
        </p>
      </div>
    </div>
  );
}

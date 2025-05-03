import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <footer className="p-2 bg-slate-200">
      <h3>Aun no tienes cuenta?</h3>
      <Link to={}>Crear una cuenta</Link>
    </footer>
  );
};

export default LoginFooter;

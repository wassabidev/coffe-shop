import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <footer className="p-2 bg-slate-200 w-full text-center">
      <h3>Aun no tienes cuenta?</h3>
      <Link to={"/signup"} className="cursor-pointer text-blue-400 underline">
        Crear una cuenta
      </Link>
    </footer>
  );
};

export default LoginFooter;

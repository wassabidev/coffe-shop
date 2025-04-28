import { useAuth } from "../provider/authProvider";

const UserPage = () => {
  const { user } = useAuth();
  return (
    <div>
      {user.name} <br />
      {user.email}
      <br />
      {user.rol}
    </div>
  );
};

export default UserPage;

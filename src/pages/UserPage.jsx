import { useSelector } from "react-redux";

const UserPage = () => {
  const user = useSelector((state) => state.user);
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

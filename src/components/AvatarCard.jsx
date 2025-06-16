import React from "react";
import { LogOut } from "lucide-react";

const AvatarCard = ({ user, role, onLogout }) => {
  return (
    <div className="bg-slate-50 flex mt-auto bottom-0 w-full items-center justify-between shadow-md px-4 py-2 hover:bg-slate-300">
      <div>
        <p className="font-semibold">{user.name}</p>
        <p>{role.name}</p>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
      >
        <LogOut />
      </button>
    </div>
  );
};

export default AvatarCard;

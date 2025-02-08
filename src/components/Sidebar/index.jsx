import { Home, PlusCircle, BadgeDollarSign, MonitorDot } from "lucide-react";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-64 h-full min-h-screen p-4 text-white bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">ADMIN</h2>
      <nav className="flex flex-col flex-1 space-y-2">
        <button
          onClick={() => onSelect("dashboard")}
          className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
        >
          <Home size={20} /> <span>Dashboard</span>
        </button>
        <button
          onClick={() => onSelect("users")}
          className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
        >
          <BadgeDollarSign size={20} /> <span>Transaction</span>
        </button>
        <button
          onClick={() => onSelect("categories")}
          className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
        >
          <PlusCircle size={20} /> <span>Categories</span>
        </button>
        <button
          onClick={() => onSelect("settings")}
          className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
        >
          <MonitorDot size={20} /> <span>Activities</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

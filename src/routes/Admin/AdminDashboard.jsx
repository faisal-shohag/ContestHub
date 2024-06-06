import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            Admin Dashboard
            <Outlet />
        </div>
    );
};

export default AdminDashboard;
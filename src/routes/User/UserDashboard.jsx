import { Outlet } from "react-router-dom";

const UserDashboard = () => {
    return (
        <div>
            User Dashboard
            <Outlet/>
        </div>
    );
};

export default UserDashboard;
import UsersTable from "@/components/app_compnents/Dashboard/UsersTable";
import useUser from "@/hooks/useUser";

const ManageUser = () => {
    let users = useUser()
    users = users[0].data

    return (
        <div>
            {users && <UsersTable users={users}/>}
        </div>
    );
};

export default ManageUser;
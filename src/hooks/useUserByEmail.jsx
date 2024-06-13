import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserByEmail = (email) => {
    const axiosSecure = useAxiosSecure();

    // Fetch users
    const { refetch, data: me = {} } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/' + email);
            return res.data;
        }
    });



  return { me, refetch };
};

export default useUserByEmail;
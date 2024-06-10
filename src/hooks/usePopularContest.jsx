import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePopularContest = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch contests
    const { refetch, data: contests = [] } = useQuery({
        queryKey: ['popular-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/popular-contests/');
            return res.data;
        }
    });
    


  return { contests, refetch };
};

export default usePopularContest;

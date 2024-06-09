import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllContest = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch contests
    const { refetch, data: contests = [] } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests-all/');
            return res.data;
        }
    });
    

     // Fetch contest by ID
     const getContestById = async (contestId) => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data.data;
  };

  

  return { contests, refetch,  getContestById };
};

export default useAllContest;

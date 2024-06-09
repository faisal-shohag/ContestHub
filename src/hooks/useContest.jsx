import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useContest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch contests
    const { refetch, data: contests = [] } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    });
    

     // Fetch contest by ID
     const getContestById = async (contestId) => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data.data;
  };

   // Update contests mutation
   const updateContestMutation = useMutation({
    mutationFn: async ({ contestId, updateData }) => {
      console.log(contestId, updateData)
        const res = await axiosSecure.put(`/contests/${contestId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Contest updated successfully');
      queryClient.invalidateQueries(['contests']);
    },
  });

  return { contests, refetch, updateContest: updateContestMutation.mutateAsync, getContestById };
};

export default useContest;

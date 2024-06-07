import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

   // Update user mutation
   const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updateData }) => {
        const res = await axiosSecure.put(`/users/${userId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      // Refetch the users after a successful update
      queryClient.invalidateQueries(['users']);
    },
  });

  return { users, refetch, updateUser: updateUserMutation.mutateAsync };
};

export default useUser;

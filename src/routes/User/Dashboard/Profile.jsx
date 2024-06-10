import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [dbUser, setDbUser] = useState(null)
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/winning-count/" + user?.email).then((res) => {
      setData(res.data.data);
    //   console.log(res.data);
    });

    axiosSecure.get("/user/"+user?.email).then((res) => {
      setDbUser(res.data.data)  
    });

  }, [axiosSecure, user]);

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: data,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: ["Win", "Attemped", "Lost"],
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00897b", "#ff8f00", "#d81b60", "#1e88e5", "#d81b60"],
      //   colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: true,
      },
    },
  };


  const handleUpdateProfile = event => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.displayName.value;
    const photoURL = form.photoURL.value;
    const info = form.info.value;

    updateUserProfile({displayName, photoURL})

    //console.log(displayName, photoURL, info);
 
    toast.promise(
        axiosSecure.put('users/'+user?.email, {name: displayName, photoURL, info}),
        {
            loading: 'Updating...',
            success: 'Updated successfully',
            error: 'Update failed'
        })
  }

  return (
    <Card className="m-0">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid lg:grid-cols-2 grid-cols-1">

      <div>
      <div className="flex lg:flex-row flex-col items-center gap-2">
            <div><img className="h-[100px] w-[100px] rounded-full" src={user?.photoURL}/></div>
           <div className="">
           <h1 className="text-3xl font-bold">{user?.displayName}</h1>
           <p className="text-lg text-center lg:text-left">{user?.email}</p>    
           </div>
        </div>
        

      </div>

        <div className="mt-4 rounded-xl border grid place-items-center px-2">
          <div className="p-2 text-xl font-bold">Your contest stats!</div>
          <Chart {...chartConfig} />
        </div>
      </div>

      <div className="p-2 text-xl font-bold mt-5 flex items-center gap-2"><Edit/> Update Profile</div>

      <div>
        <form  onSubmit={handleUpdateProfile}>
            <Label>Name</Label>
            <Input name="displayName" type="text" placeholder="Name" defaultValue={user?.displayName} className="input input-bordered w-full max-w-xs" />

            <Label>Email</Label>
            <Input disabled placeholder="Email" defaultValue={user?.email} className="input input-bordered w-full max-w-xs mt-2" />
            <Label>PhotoURL</Label>
            <Input name="photoURL" type="text" placeholder="PhotoURL" defaultValue={user?.photoURL} className="input input-bordered w-full max-w-xs mt-2" />
            <Label>Aditional info</Label>
            <Input defaultValue={dbUser?.info} name="info" type="text" placeholder="Aditional info" className="input input-bordered w-full max-w-xs mt-2" />
            <Button className="btn btn-primary mt-2">Update</Button>
        </form>
      </div>

      </CardContent>
    </Card>
  );
};

export default Profile;

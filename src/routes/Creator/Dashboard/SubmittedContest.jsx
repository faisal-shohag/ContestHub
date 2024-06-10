import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/app_compnents/Common/Loding";
import { ChevronRight, Gift } from "lucide-react";
import ContestSubmissionTable from "@/components/app_compnents/Dashboard/ContestSubmissionTable";

const SubmittedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [contests, setContests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [tableName, setTableName] = useState('All submissions')

  useEffect(() => {
    axiosSecure.get(`/contests-by-creator/${user?.email}`).then((res) => {
      setContests(res.data.data);
  
      const c = res.data.data;
      let sub = [];
      for (let i = 0; i < c.length; i++) {
        for (let j = 0; j < c[i].participants.length; j++) {
          sub.push(c[i].participants[j]);
        }
      }
      setSubmissions(sub);
    });
  }, [axiosSecure, user?.email]);


  const update = () => {
    axiosSecure.get(`/contests-by-creator/${user?.email}`).then((res) => {
        setContests(res.data.data);
    
        const c = res.data.data;
        let sub = [];
        for (let i = 0; i < c.length; i++) {
          for (let j = 0; j < c[i].participants.length; j++) {
            sub.push(c[i].participants[j]);
          }
        }
        setSubmissions(sub);
      });
  }

  const handleSubmmissionView = (index) => {
    setTableName(contests[index].name)
    setSubmissions(contests[index].participants)
  } 


  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle>Submitted Contests</CardTitle>
          <CardDescription>
            Here manage the submitted contests. Click to particular contest to
            view it&apos;s all submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="">
              {contests ? (
                <>
                  {contests.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {contests.map((contest, index) => (
                          <div
                          onClick={()=>handleSubmmissionView(index)}
                            className="border p-2 rounded-md flex items-center gap-3 justify-between cursor-pointer hover:bg-muted"
                            key={contest._id}
                          >
                            <div className="flex items-center gap-3">
                              <div>{contest.name}</div>
                              <div className="flex  items-center font-bold">
                                {" "}
                                ${contest.price_money}{" "}
                                <Gift className="text-red-500" />
                              </div>
                            </div>

                            <div>
                              <ChevronRight />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 font-bold">
                        {tableName}
                        <ContestSubmissionTable submissions={submissions} update={update}/>
                      </div>
                    </>
                  ) : (
                    <>Not contests</>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmittedContest;

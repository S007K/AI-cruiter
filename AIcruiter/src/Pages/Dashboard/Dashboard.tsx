// import { Skeleton } from "@/components/ui/skeleton"

import {  useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
//   import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
//     TooltipProvider,
//   } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import CreateInterview from "@/components/AppComponents/CreateInterview";
import {   useEffect, useState } from "react";
import { dataDatype } from "@/types";
import { getInterviewDetails } from "@/Service/ServiceAPI";
import FeedBackAkert from "@/components/AppComponents/FeedBackAkert";
// import UserContext from "@/Context/UserContext";
import Cookies from "js-cookie"
import { toast } from "sonner";

export default function Dashboard() {
  // const { isSignedIn } = useUser();
  // const {user}=useContext(UserContext)
  const navigate = useNavigate();
  const [givenInterview, setGivenInterview] = useState<dataDatype[]>([]);
  const [commingInterview, setCommingInterview] = useState<dataDatype[]>([]);
  
  // const [data, setData] = useState<dataDatype>(
  //     {
  //         completed:false,
  //         interviewName: "",
  //         skills: "",
  //         yearsofex: "",
  //         feedBack: {
  //             generalFeedback: "",
  //             mainFeedback: [{ question: "" }],
  //             marks: "",
  //         }||null
  //     }
  // )

  // console.log("user",user)

  const retakeInterview = (value:dataDatype) => {
    
    const interviewData = {
      interviewName: value.interviewName,
      skills: value.skills,
      yearsofex: value.yearsofex,
      _id: value._id,
    };
    const formatedResponse = value.questionDetails;
    console.log(interviewData);
    navigate("/interview-page/" + interviewData._id, {
      state: { formatedResponse: formatedResponse, interviewData },
    });
  };

  useEffect(() => {
    (async function () {
      const userid = localStorage.getItem("id")
      if (userid) {
        const response = await getInterviewDetails(userid);
        console.log(response);
        const givenInterviewList = response.filter(
          (value: dataDatype) => value.completed === true
        );
        console.log(givenInterviewList);
        setGivenInterview(givenInterviewList);
        const commingInterviewList = response.filter(
          (value: dataDatype) => value.completed !== true
        );
        // console.log(commingInterviewList)
        setCommingInterview(commingInterviewList);
        
      }
      else {
        toast.error("No Id found")
      }
    })();
    if (!Cookies.get("token")) {
       navigate("/auth/sign-in");
    }
  }, []);

//   useEffect(() => {
    
//     const authToken = Cookies.get('token');
//     console.log(authToken)
//   //  authUser(authToken)
// }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
         
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header> */}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Mock Interview</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Experience our AI-based mock interview platform to refine
                      your skills, receive instant feedback, and boost your
                      confidence for real-world interviews.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <CreateInterview />{" "}
                    {/* <Button>{ CreateInterview}</Button> */}
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>Interview Given</CardDescription>
                    <CardTitle className="text-4xl">
                      {givenInterview.length + commingInterview.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +25% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                {/* <div className="flex items-center">
                 <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList> 
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div> */}
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Interviews</CardTitle>
                      <CardDescription>
                        List of Given Interviews
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name of interview</TableHead>

                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              YOE
                            </TableHead>
                            <TableHead className="text-right">Marks</TableHead>
                            <TableHead className="text-right">
                              Feedback
                            </TableHead>
                            <TableHead className="text-right">
                              Try Again
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {givenInterview &&
                            givenInterview.map((value, key) => {
                              return (
                                <TableRow className="bg-accent" key={key}>
                                  <TableCell>
                                    <div className="font-medium">
                                      {value.interviewName}
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      {value.skills}
                                    </div>
                                  </TableCell>

                                  <TableCell className="hidden sm:table-cell">
                                    <Badge
                                      className="text-xs"
                                      variant="secondary"
                                    >
                                      Mock
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {value.yearsofex}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {value.feedBack?.marks}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <FeedBackAkert data={value} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button onClick={()=>retakeInterview(value)}>Try Again</Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      New Interviews
                    </CardTitle>
                    <CardDescription>
                      Interviews that have not yet been given
                    </CardDescription>
                  </div>
                  {/* <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div> */}
                </CardHeader>
                <CardContent>
                  {commingInterview ? (
                    commingInterview.map((value, key) => {
                      return (
                        <Card key={key} className=" mt-4 p-0 mb-8">
                          <CardHeader>
                            <CardTitle>{value.interviewName}</CardTitle>
                            <CardDescription>
                              Experience {value.yearsofex}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Skills: {value.skills}</p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              onClick={() => retakeInterview(value)}
                            >
                              Give
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })
                  ) : (
                    <div className=" w-fit mx-auto">No data Found</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

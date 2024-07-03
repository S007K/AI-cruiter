import { getFeedback } from "@/Service/ServiceAPI";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Feedback = () => {
  const { interviewid } = useParams();
  const [feedback, setfeedback] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getFeedback(interviewid);
      console.log(response.data);
      setfeedback(response.data[0].mainFeedback);
    }
    getData();
  }, []);
  return (
    <>
      <div className=" m-[5rem]">
        {feedback.length > 0
          ? feedback.map((value, key) => {
              return (
                <Accordion type="single" collapsible key={key}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className=" text-left">
                      {key + 1 + " :  " + value.question}
                    </AccordionTrigger>
                    <AccordionContent>
                              <div className="flex gap-28">Answer : {value.answer} <span className="">Marks : { value.marks}</span></div>
                      <div className="mt-4 text-md leading-6">Feedback : {value.feedback}</div>

                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Feedback;

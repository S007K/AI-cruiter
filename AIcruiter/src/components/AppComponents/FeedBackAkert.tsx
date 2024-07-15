import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "../ui/button"
import { dataDatype } from "@/types"

interface Alertpropstype{
    data:dataDatype
}

const FeedBackAkert = ({ data }:Alertpropstype) => {
    


  return (
    <>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Feed Back</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Feed Back</AlertDialogTitle>
          <AlertDialogDescription>
            <span className=" font-bold">General Feed Back : </span>{data.feedBack?.generalFeedback}
                      </AlertDialogDescription>
                      
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default FeedBackAkert

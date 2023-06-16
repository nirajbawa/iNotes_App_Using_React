import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NoteContext from "../../../context/notes/NoteContext";
import { Spinner } from "@material-tailwind/react"


const NoteItem = (props) => {

  const Notes = useContext(NoteContext)

  useEffect(()=>{
    AOS.init({
      offset: 0,
      startEvent: 'DOMContentLoaded',
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000, // values from 0 to 3000, with step 50ms
      once: true,
    });
  },[])

  const [status, setStatus] = useState(false)

  return (
    <Card className="mt-6 w-96 flex flex-col justify-between self-stretch gap-8 lg:gap-1 lg:px-3 lg:py-6 border-2 border-b-white cursor-pointer dark:bg-[#2195f314] dark:border-none"  data-aos="fade-up">
      <CardBody className="flex flex-col justify-between content-center items-center py-5 px-6 lg:py-3 lg:px-4 gap-5 lg:gap-5" onClick={()=>{props.openUpdateDrawer(props.id, props.title, props.description, props.tag, props.date)}} >
        <Typography variant="h5" color="blue-gray" className="mb-2 w-full capitalize flex align-middle items-center lg:h-10 dark:text-[#eee]">
          {
            props.title.length > 55
            ? props.title.replace(/(<([^>]+)>)/ig,"").slice(0, 55) + "..........."
            : props.title.replace(/(<([^>]+)>)/ig,"")
          }
        </Typography>
        <Typography className="h-44 lg:h-40 flex  w-full font-light dark:text-[#eee]">
          {/* {parse(yourHtmlString)} */}
          {props.description.length > 250
                ? props.description.replace(/(<([^>]+)>)/ig,"").slice(0, 250) + "........"
                : props.description.replace(/(<([^>]+)>)/ig,"")
          }
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 lg:py-5 lg:px-4 flex justify-between">
        <div className="flex justify-start gap-5 w-2/4">
          <Tooltip content="Delete Note" placement="bottom" >
            
            <IconButton className="bg-red-500 shadow-none  hover:shadow-none" onClick={()=>{Notes.deleteNote(props.id, setStatus)}}>
            {status?<Spinner className="w-4 h-4"/>: <DeleteIcon />}
            </IconButton>
          </Tooltip>
        </div>

          <Button className=" hover:shadow-none dark:bg-[#1e4976] shadow-none" onClick={()=>{props.openUpdateDrawer(props.id, props.title, props.description, props.tag, props.date)}}>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default NoteItem;

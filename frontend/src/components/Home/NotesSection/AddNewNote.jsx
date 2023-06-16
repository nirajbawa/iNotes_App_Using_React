import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from "@material-tailwind/react";
import TextEditor from "./TextEditor";
import { useState, useEffect, useContext} from "react";
import NoteContext from "../../../context/notes/NoteContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AlertContext from "../../../context/Alert/AlertContext";
import { Spinner } from "@material-tailwind/react"

const AddNewNote = (props) => {
  const Notes = useContext(NoteContext);
  const Alert = useContext(AlertContext);

  const [state, setState] = useState({ text: "" });

  let [size, setSize] = useState(window.innerWidth >= 960 ? "xl" : "xxl");

  const [status, setStatus] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth >= 960 ? "xl" : "xxl");
    });
  }, []);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const clearStates = () => {
    setState("");
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const save = () => {
    if (note.title.match(/([^\s])/)) {
      Notes.addNote(
        note.title,
        note.description,
        note.tag,
        props.closeDrawerTop,
        clearStates,
        setStatus
      );
    } else {
      Alert.setAlert("Please fill the title....", "red");
    }
  };

  return (
    <>
      <Dialog
        open={props.openTop}
        size={size}
        className="h-screen w-full lg:h-[95%]  overflow-y-scroll z-10 dark:bg-[#132237ca] dark:navblur"
        key={50}
        ref={props.cardRef}
      >
        <DialogHeader className="flex justify-between pt-7 px-7 lg:px-10 dark:text-[#eee]">
          Add New Post
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              props.closeDrawerTop();
              clearStates();
            }}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="py-0  pl-7 lg:pl-5">
          <div className=" flex flex-col gap-y-5 overflow-y-hidden z-10 lg:px-5 lg:py-5 pt-5">
            <Input
              variant="standard"
              label="Note Heading"
              required={true}
              name="title"
              className="capitalize dark:text-[#eee]"
              onChange={onChange}
              minLength={3}
            />
            <TextEditor state={state} setState={setState} onChange={onChange} />
            <Input
              variant="standard"
              label="Tag"
              name="tag"
              className="dark:text-[#eee] capitalize"
              onChange={onChange}
              required={true}
            />
          </div>
        </DialogBody>

        <DialogFooter className="z-50 py-5 lg:py-0 ">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              props.closeDrawerTop();
              clearStates();
            }}
            className="mr-1 z-0"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color={note.title.match(/([^\s])/) ? "green" : "gray"}
            className="mr-1 z-0 w-24 flex justify-center"
            onClick={save}
          >
            <span> {status?<Spinner className="w-4 h-4"/>:"Save"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddNewNote;

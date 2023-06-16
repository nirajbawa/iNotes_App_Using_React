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
import { useState, useEffect, useContext } from "react";
import NoteContext from "../../../context/notes/NoteContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AlertContext from "../../../context/Alert/AlertContext";
import { Spinner } from "@material-tailwind/react"

const UpdateNote = (props) => {
  const Notes = useContext(NoteContext);
  const Alert = useContext(AlertContext);

  let [size, setSize] = useState(window.innerWidth >= 960 ? "xl" : "xxl");
  const [state, setState] = useState({ text: props.updateParams.description });
  const [status, setStatus] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth >= 960 ? "xl" : "xxl");
    });
  }, []);

  useEffect(() => {
    setState({ text: props.updateParams.description });
  }, [props.updateParams]);

  const onChange = (e) => {
    props.setUpdateParams({
      ...props.updateParams,
      [e.target.name]: e.target.value,
    });
  };

  const clearStates = () => {
    setState("");
  };

  const save = () => {
    if (
      props.updateParams.title.match(/([^\s])/) &&
      props.updateParams.tag.match(/([^\s])/)
    ) {
      Notes.editNote(
        props.updateParams.id,
        props.updateParams.title,
        props.updateParams.description,
        props.updateParams.tag,
        setStatus
      );
    } else {
      Alert.setAlert("Please Fill All Fields....", "red");
    }
  };

  return (
    <>
      <Dialog
        open={props.openUpdate}
        size={size}
        className="h-screen w-full lg:h-[95%]  overflow-y-scroll z-10 dark:bg-[#132237ca] dark:navblur"
        key={20}
        ref={props.UcarRef}
      >
        <DialogHeader className="flex justify-between pt-7 px-7 lg:px-10 dark:text-[#eee]">
          Edit Note
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              props.closeUpdateDrawer();
              clearStates();
            }}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="py-0 pl-7 lg:pl-6 ">
          <div className=" flex flex-col gap-y-5 overflow-y-hidden z-10 lg:px-5 lg:py-5 pt-5 ">
            <Input
              variant="standard"
              label="Note Heading"
              required={true}
              name="title"
              onChange={onChange}
              className="capitalize dark:text-[#eee]"
              minLength={3}
              value={props.updateParams.title}
            />
            <TextEditor state={state} setState={setState} onChange={onChange} />
            <Input
              variant="standard"
              label="Tag"
              name="tag"
              className="dark:text-[#eee] capitalize"
              onChange={onChange}
              required={true}
              value={props.updateParams.tag}
            />
          </div>
        </DialogBody>

        <DialogFooter className="z-50 flex justify-between py-5 lg:py-0 lg:px-10 pl-7 ">
          <div className="text-gray-800 font-normal text-[11px] lg:text-[13px] dark:text-[#eee]">{props.updateParams.date}</div>
          <div className="flex justify-center flex-row">
            <Button
              variant="text"
              color="red"
              onClick={() => {
                props.closeUpdateDrawer();
                clearStates();
              }}
              className="mr-1 z-0"
            >
              <span>Cancel</span>
            </Button>

            <Button
              variant="gradient"
              className="mr-1 z-0 w-24 flex justify-center flex-row"
              color={props.updateParams.tag.match(/([^\s])/) ? "green" : "gray"}
              onClick={save}
            >
              <span>{status?<Spinner className="w-4 h-4"/>:"Save"}</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateNote;

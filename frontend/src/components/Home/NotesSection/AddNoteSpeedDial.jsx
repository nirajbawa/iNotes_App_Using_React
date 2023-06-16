import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Tooltip
  } from "@material-tailwind/react";
  import {
    PlusIcon
  } from "@heroicons/react/24/outline";
  import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
   
const AddNoteSpeedDial = (props) => {
    return (
        <div className="fixed bottom-10 right-5 lg:bottom-10 lg:right-10 ">
      <div className="relative w-full h-80">
        <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full dark:bg-[#3a85d5bf]  ">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
          <Tooltip content="Add Note" placement="top">
            <SpeedDialAction className="dark:bg-[#3a85d5bf]">
              <EditNoteOutlinedIcon className="h-5 w-5 dark:text-[#eee]" onClick={props.openDrawerTop} />
            </SpeedDialAction>
            </Tooltip>
          </SpeedDialContent>
        </SpeedDial>
        </div>
      </div>
      </div>
    );
  }

  export default AddNoteSpeedDial
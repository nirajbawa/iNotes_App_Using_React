import { Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import AlertContext from "../../context/Alert/AlertContext";
import { useContext } from 'react';

const App_Alert = () => {
    const AlertCon = useContext(AlertContext)
  return (
    <div className="w-full flex justify-center items-center md:justify-end md:px-4 md:py-4 fixed bottom-0 md:bottom-5 " style={{zIndex:10000000000}}>
    <Alert
    variant="gradient"
    color={AlertCon.color}
    open={AlertCon.open}
    icon={<ExclamationTriangleIcon className="h-6 w-6" />}

    className=" md:w-2/4 lg:w-1/3 capitalize"

    action={
      <Button
        variant="text"
        color="white"
        size="sm"
        className="!absolute top-3 right-3"
        onClick={() => AlertCon.setOpen(false)}
      >
        Close
      </Button>
    }
  >
    {AlertCon.message}
  </Alert>
  </div>
  )
}

export default App_Alert
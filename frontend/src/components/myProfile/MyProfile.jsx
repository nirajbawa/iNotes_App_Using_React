import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Breadcrumbs
} from "@material-tailwind/react";
import NoteContext from "../../context/notes/NoteContext";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import HomeIcon from '@mui/icons-material/Home';

const MyProfile = () => {
  const notecon = useContext(NoteContext);
  const [avatarIcon, setAvatarIcon] = useState("unknown");
  const [pData, setPData] = useState({name:"", email:""})

  const setPageData = async() =>{
    let data = await notecon.getUserDetails(setAvatarIcon);
    setPData({name:data.name, email:data.email})
  }

  useEffect(() => {
    setPageData();
  }, []);

  const config = genConfig(avatarIcon);

  return (
    
    <div className="flex justify-center flex-col items-center py-5 my-0 px-6 lg:px-36 lg:py-16 w-full h-screen  ">
       <div className="w-full pb-5 ">
       <Breadcrumbs className="dark:bg-[#2195f314] dark:border-none">
      <Link to="/" className="opacity-60 dark:text-[#eee]">
       <HomeIcon />
      </Link>
    </Breadcrumbs>
       </div>

      <Card className="w-80 py-10 lg:w-96 dark:bg-[#2195f314] dark:border-none">
        <CardHeader floated={false} className="h-[18rem] lg:h-[22rem]  shadow-none rounded-full">
            {
                avatarIcon=="unknown"?<Spinner className="h-full w-full"/>:<Avatar className="w-full h-full" {...config} />
            }
          
        </CardHeader>
        <CardBody className="text-center pt-10">
          <Typography variant="h4" color="blue-gray" className="mb-2 capitalize dark:text-[#eee]">
            {pData.name}
          </Typography>
          <Typography color="blue" className="font-medium dark:text-[#5978ff]" textGradient>
           {pData.email}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfile;

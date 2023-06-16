import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";
import { Spinner } from "@material-tailwind/react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AlertContext from "../../context/Alert/AlertContext";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

export const Navbtn = () => {
  const navigate = useNavigate();
  const notecon = useContext(NoteContext)
  const AlertCon = useContext(AlertContext)

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: AccountCircleOutlinedIcon,
      btnfunc: () => {
        navigate("/myprofile")
      },
    },
    {
      label: "Light",
      icon: AlertCon.theme ? WbSunnyOutlinedIcon :  DarkModeOutlinedIcon ,
      btnfunc: () => {
        AlertCon.setDarkMode()
        console.log("hello")
      },
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      btnfunc: () => {
        localStorage.removeItem("token");
        notecon.setNotes([])
        navigate("/signin");
      },
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const loc = useLocation();
  const [avatarIcon, setAvatarIcon] = useState("unknown");

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      notecon.getUserDetails(setAvatarIcon)
    }
    
  });

  const config = genConfig(avatarIcon);

  return (
    <>
      {localStorage.getItem("token") ? (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto border-none"
            >
               {
                avatarIcon=="unknown"?<Spinner className="h-full w-full"/>:<Avatar className="w-10 h-10" {...config} />
            }
              
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform dark:text-[#eee] ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1 mt-2 lg:mt-1 dark:bg-[#13223780] dark:shadow-none dark:navblur">
            {profileMenuItems.map(({ label, icon, btnfunc }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={btnfunc}
                  className={`flex items-center gap-2 rounded hover:outline-none dark:hover:bg-[#05091062] dark:text-[#eee]  ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-5 w-5 dark:text-[#eee] ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal dark:text-[#eee]"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      ) : (
        <Link to={loc.pathname == "/signup" ? "/signin" : "/signup"}>
          <Button className="w-28 shadow-none hover:shadow-none">
            {loc.pathname == "/signup" ? "Sign In" : "Sign Up"}
          </Button>
        </Link>
      )}
    </>
  );
};

export default Navbtn;

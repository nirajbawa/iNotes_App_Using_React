import React, { useState } from "react";
import { Navbar } from "@material-tailwind/react";
// import Navlist from "./Navlist";
import Navbtn from "./Navbtn";
// import NavResBtn from "./NavResBtn";
// import NavRes from "./NavRes";
import { Link } from "react-router-dom";


export const AppNavbar = (props) => {
  const [openNav, setOpenNav] = useState(false);


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-3 px-4 lg:px-36 lg:py-4 dark:bg-[#13223780] dark:navblur border-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          
          <Link
            className="mr-4 cursor-pointer py-1.5 font-bold font-sans text-xl dark:text-[#eee]"
            to="/"
          >
            {props.navConfig.appName}
          </Link>

          <div className="flex items-center gap-1">
            <div className="mr-4 hidden lg:block">
              {/* <Navlist navlist = {...props.navConfig.navList} /> */}
            </div>
           

            
              <Navbtn />
            
            
           
            {/* <NavResBtn openNav={openNav} setOpenNav={setOpenNav} /> */}
          </div>
        </div>
        {/* <NavRes openNav={openNav} navConfig = {...props.navConfig}  /> */}
      </Navbar>
    </>
  );
};

export default AppNavbar;

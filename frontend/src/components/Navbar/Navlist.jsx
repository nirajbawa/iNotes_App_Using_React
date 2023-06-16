import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navlist = (props) => {
  let location = useLocation()
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 capitalize ">
      {props.navlist.map((value, index) => {
        return (
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className={`p-1 font-Roboto text-lg font-${location.pathname==value.link?"[600]":"[400]"}`}
            key={index}
          >
            <Link to={value.link} className="flex items-center">
              {value.name}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );
};

export default Navlist;

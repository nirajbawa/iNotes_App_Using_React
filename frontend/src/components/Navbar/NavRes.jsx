import { Collapse } from "@material-tailwind/react";
// import Navlist from "./Navlist";

const NavRes = (props) => {
  return (
    <Collapse open={props.openNav}>
          {/* <Navlist navlist = {...props.navConfig.navList}/> */}
          {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button> */}
        </Collapse>
  )
}

export default NavRes
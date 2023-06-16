import React, { useContext, useEffect } from "react";
import { Badge, Button, IconButton, Chip } from "@material-tailwind/react";
import NoteContext from "../../../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const NotesCategoryBar = () => {
  const NoteCon = useContext(NoteContext);
  const navigate = useNavigate();

  const fetchCatNotes = (tag) => {
    NoteCon.getAllNotes(tag);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      NoteCon.getAllNotes("-");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="flex px-2 justify-center">
      <div className="flex items-center lg:justify-center justify-center  pt-14 pb-9 overflow-scroll gap-x-3  w-full lg:px-36 lg:pt-16 lg:pb-0">
        <Chip
          variant="ghost"
          className={` ${NoteCon.notes.length!=0?"ml-14":""} transition-all duration-75 capitalize  text-sm dark:text-[#eee] `}
          value="All"
          onClick={() => {
            NoteCon.getAllNotes("-");
          }}
        />
        {NoteCon.category.map((value, index) => {
          return (
            <Chip
              variant="ghost"
              className=" transition-all duration-75 text-sm dark:text-[#eee] capitalize "
              value={value}
              onClick={() => {
                fetchCatNotes(value);
              }}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

// bg-[#2196f38c]

export default NotesCategoryBar;

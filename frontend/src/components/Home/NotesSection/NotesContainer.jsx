import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../../../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNoteSpeedDial from "./AddNoteSpeedDial";
import AddNewNote from "./AddNewNote";
import lottieJson from "../../../assets/lottiefilesAnimations/not-found.json";
import Lottie from "react-lottie-player";
import UpdateNote from "./UpdateNote";


const Notes = () => {
  const Notes = useContext(NoteContext);
  

  const cardRef = useRef(null);
  const UcarRef = useRef(null);

  const [openTop, setOpenTop] = useState(false);

  const openDrawerTop = () => {
    setTimeout(() => {
      cardRef.current.parentElement.parentElement.style.overflow = "hidden";
    }, 0);

    setOpenTop(true);
  };
  const closeDrawerTop = () => setOpenTop(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateParams, setUpdateParams] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
    date: "",
  });

  const openUpdateDrawer = (id, title, description, tag, date) => {
    var dateObj = new Date(date);
    var localDateTime = dateObj.toLocaleString();

    setTimeout(() => {
      UcarRef.current.parentElement.parentElement.style.overflow = "hidden";
    }, 0);

    setOpenUpdate(true);
    setUpdateParams({ id, title, description, tag, date: localDateTime });
  };

  const closeUpdateDrawer = () => {
    setOpenUpdate(false);
    setUpdateParams({ id: "", title: "", description: "", tag: "", date: "" });
  };

  return (
    <div className={`flex justify-center flex-wrap content-start items-center h-full  gap-8 lg:gap-10 lg:gap-x-12 pt-0 ${Notes.notes.length!=0?"pb-28":"h-screen overflow-hidden"} ${Notes.notes.length==1?"pb-96":""}  px-6 lg:px-32 lg:py-32 w-full h-full dark:bg-[#0f172a]`}>
      {Notes.notes.length == 0 && (
        <div className="w-full h-96">
          <Lottie
            loop
            animationData={lottieJson}
            play
            className="w-full h-full"
          />
        </div>
      )}

      <AddNewNote
        closeDrawerTop={closeDrawerTop}
        openTop={openTop}
        cardRef={cardRef}
      />
      <UpdateNote
        closeUpdateDrawer={closeUpdateDrawer}
        openUpdate={openUpdate}
        updateParams={updateParams}
        setUpdateParams={setUpdateParams}
        UcarRef={UcarRef}
      />
      {Notes.notes.map((value, index) => {
        return (
          <NoteItem
            title={value.title}
            description={value.description}
            tag={value.tag}
            id={value._id}
            key={index}
            openUpdateDrawer={openUpdateDrawer}
            date={value.Date}
          />
        );
      })}
      <AddNoteSpeedDial openDrawerTop={openDrawerTop} />
    </div>
  );
};

export default Notes;

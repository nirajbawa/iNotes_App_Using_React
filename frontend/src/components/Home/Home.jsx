import { useEffect } from "react";
import NotesContainer from "./NotesSection/NotesContainer";
import { useNavigate } from "react-router-dom";
import NotesCategoryBar from "./NotesSection/NotesCategoryBar";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <NotesCategoryBar />
      <NotesContainer />
    </div>
  );
};

export default Home;

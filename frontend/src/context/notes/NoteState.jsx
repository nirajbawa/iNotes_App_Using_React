import { useState, useContext, useEffect } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../Alert/AlertContext";

const NoteState = (props) => {
  const HOST = import.meta.env.VITE_API_HOST;

  const Alert = useContext(AlertContext);

  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState([])



  const removeDuplicates = (arr) => {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

  const setNotesCategory = (data) =>{
    let tags = []
    for(let i = 0; i<data.length; i++)
    {
      tags.push(data[i].tag)
    }

    const category = removeDuplicates(tags)
    setCategory(category)

  }

  useEffect(()=>{
    setNotesCategory(notes);
  }, [notes])


  // fetch all notes
  const getAllNotes = (cat) => {
    fetch(`${HOST}/api/notes/${cat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // logic to show notes in client
        setNotes(data);
      })
      .catch((e) => {
        Alert.setAlert("Try Again", "red");
      });
  };

  // add new note
  const addNote = (title, description, tag, closeModel, clearStates, setStatus) => {
    let note = {
      title: title,
      description: description,
    };
    if (tag != "") {
      note.tag = tag;
    }

    // add to server
    let status = false;
    if (navigator.onLine) {
      setStatus(true)
      fetch(`${HOST}/api/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(note),
      })
        .then((response) => {
          if (response.status == 200) {
            status = true;
            return response.json();
          }
        })
        .then((data) => {
          // logic to add new note in client
          if (status) {
            setNotes(notes.concat(data));
            Alert.setAlert("Note Added successfully....", "green");
            setStatus(false)
            closeModel();
            clearStates();
          } else {
            Alert.setAlert("Try Again", "red");
            setStatus(false)
          }
        })
        .catch((e) => {
          Alert.setAlert("Try Again", "red");
          setStatus(false)
        });
    } else {
      Alert.setAlert("Please Check Your Connection You are offline", "red");
    }
  };

  // delete note
  const deleteNote = (id, setStatus) => {
    // add to server
    let status = false;
    if (navigator.onLine) {
      setStatus(true)
      fetch(`${HOST}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      })
        .then((response) => {
          if (response.status == 200) {
            status = true;
            return response.json();
          }
        })
        .then((data) => {
          if (status) {
            Alert.setAlert("Note Deleted successfully....", "blue");
            setStatus(false)
            // logic to delete note in client
            setNotes(
              notes.filter((value) => {
                return value._id != id;
              })
            );
          } else {
            Alert.setAlert("Try Again", "red");
            setStatus(false)
          }
        })
        .catch((e) => {
          Alert.setAlert("Try Again", "red");
          setStatus(false)
        });
    } else {
      Alert.setAlert("Please Check Your Connection You are offline", "red");
    }
  };

  // update note
  const editNote = (id, title, description, tag, setStatus) => {
    let note = {
      title,
      description,
      tag,
    };

    let status = false;
    if (navigator.onLine) {
      setStatus(true)
      fetch(`${HOST}/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(note),
      })
        .then((response) => {
          if (response.status == 200) {
            status = true;
            return response.json();
          }
        })
        .then((data) => {
          if (status) {
            Alert.setAlert("Note Updated successfully....", "blue");
            setStatus(false)
            // logic to edit Note in client
            for (let i = 0; i < notes.length; i++) {
              let element = notes[i];
              if (element._id == id) 
              {
                element.title = data.title;
                element.description = data.description;
                element.tag = data.tag;
                element.Date = data.Date;
              }
            }

            setNotesCategory(notes);
          } else {
            Alert.setAlert("Try Again", "red");
            setStatus(false)
          }
        })
        .catch((e) => {
          Alert.setAlert("Try Again", "red");
          setStatus(false)
        });
    } else {
      Alert.setAlert("Please Check Your Connection You are offline", "red");
    }
  };


  // fetch user details

  const getUserDetails = async (setavatar) => {
    if (navigator.onLine) {
      try {
        const response = await fetch(`${HOST}/api/auth/getuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        let data = await response.json();
        setavatar(data.email)
        return data
      } catch (e) {
      }
    } else {
      Alert.setAlert("Please Check Your Connection You are offline", "red");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, setNotes, addNote, deleteNote, editNote, getUserDetails, category }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

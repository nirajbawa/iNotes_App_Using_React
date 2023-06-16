import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppNavbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import App_Alert from "./components/Alert/App_Alert";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import MyProfile from "./components/myProfile/MyProfile";
import AlertContext from "./context/Alert/AlertContext";
import { useContext, useEffect } from "react";

function App() {

  const AlertCon = useContext(AlertContext)

  const navConfig = {
    appName: "iNotes",
    navList: [],
  };

  

  useEffect(()=>{
    AlertCon.detectTheme()
    
  }, [])

  return (
    <>
      <BrowserRouter>
        <AppNavbar navConfig={navConfig} />

        <div className="text-[Roboto] text-base w-full h-full ">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route exact path="/myprofile" element={<MyProfile />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>

        <App_Alert />
      </BrowserRouter>
    </>
  );
}

export default App;

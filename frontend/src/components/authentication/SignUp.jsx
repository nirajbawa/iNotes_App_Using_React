import React, { useEffect, useState, useContext } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import signup from "../../assets/lottiefilesAnimations/signup.json";
import validator from "validator";
import AlertContext from "../../context/Alert/AlertContext";
import { useNavigate } from 'react-router-dom';
import signinbg from '../../assets/images/signupbg.jpg'
import { Spinner } from "@material-tailwind/react"

const SignUp = () => {
  let navigate = useNavigate()
  const HOST = import.meta.env.VITE_API_HOST;
  const Alert = useContext(AlertContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassowrd: "",
  });
  const [color, setColor] = useState("bg-gray-500");
  const [status, setStatus] = useState(false)

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      credentials.name != "" &&
      validator.isEmail(credentials.email) &&
      credentials.password.match(/([^\s])/) &&
      credentials.password.length >= 8 &&
      credentials.password == credentials.confirmPassowrd
    ) {
      setColor("bg-light-blue-500");
    } else {
      setColor("bg-gray-500");
    }
  }, [credentials]);

  const submitCredentials = async (e) => {
    e.preventDefault();
    if (credentials.name != "") {
      if (validator.isEmail(credentials.email)) {
        if (credentials.password.match(/([^\s])/)) {
          if(credentials.password.length >= 8)
          {
            if(credentials.password == credentials.confirmPassowrd)
            {
          if (navigator.onLine) {
            try{
              setStatus(true)
            let response = await fetch(`${HOST}/api/auth/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            });

            let data = await response.json();
            console.log(data)
            if (response.status == 200) {
              localStorage.setItem("token", data.authToken);
              Alert.setAlert("Sign Up Successfully....", "green");
              setStatus(false)
              navigate('/')
            } else {
              try {
                let errors = data.errors;
                for (let i = 0; i < data.errors.length; i++) {
                  Alert.setAlert(errors[i].msg, "red");
                }
                setStatus(false)
              } catch {
                Alert.setAlert(data.error, "red");
                setStatus(false)
              }
            }
          }
          catch(e)
          {
            Alert.setAlert("Try Again", "red");
          }
            
          } else {
            Alert.setAlert(
              "Please Check Your Connection You are offline",
              "red"
            );
          }
        }
        else{
          Alert.setAlert(" passwords didn’t match. Try again", "red");
        }
        }
        else{
          Alert.setAlert("password must be atleast 8 characters long", "red");
        }
        } else {
          Alert.setAlert("fill out the password field", "red");
        }
      } else {
        Alert.setAlert("fill out the valid email", "red");
      }
    } else {
      Alert.setAlert("fill out the name field", "red");
    }
  };

  return (
    <div className="py-0 px-5 lg:px-0 lg:py-0 flex justify-center lg:justify-end align-middle items-center w-full h-full" style={{ backgroundImage: `url(${signinbg})` }}>
      <div className="w-full h-screen lg:flex hidden justify-center items-center overflow-hidden">
        <div className="h-[35rem] overflow-hidden">
          <Lottie loop animationData={signup} play className="w-full h-full" />
        </div>
      </div>

      <div className="h-screen flex justify-center items-start lg:items-center py-14 lg:py-14 px-5 lg:px-32 bg-white dark:bg-[#0f172a] ">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="dark:text-[#eee]">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal dark:text-[#eee]">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={submitCredentials}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                className="dark:text-[#eee]"
              />
              <Input
                size="lg"
                label="Email"
                autoComplete="username"
                name="email"
                value={credentials.email}
                onChange={onChange}
                className="dark:text-[#eee]"
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={onChange}
                name="password"
                className="dark:text-[#eee]"
              />
              <Input
                type="password"
                size="lg"
                label="Confirm"
                autoComplete="current-password"
                value={credentials.confirmPassowrd}
                onChange={onChange}
                name="confirmPassowrd"
                className="dark:text-[#eee]"
              />
            </div>

            <Button
              className={`mt-6 ${color} hover:shadow-none shadow-none text-base lg:tracking-widest flex justify-center items-center`}
              fullWidth
              type="submit"
            >
               {status?<Spinner />:"Register"}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal dark:text-[#eee]">
              Already have an account?
              <Link
                to="/signin"
                className="font-medium  text-light-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

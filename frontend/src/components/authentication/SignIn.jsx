import React, { useEffect, useState, useContext } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import signin from "../../assets/lottiefilesAnimations/signin.json";
import validator from 'validator';
import AlertContext from '../../context/Alert/AlertContext'
import { useNavigate } from 'react-router-dom';
import signupbg from '../../assets/images/signinbg.jpg'
import { Spinner } from "@material-tailwind/react"

const SignIn = () => {
    let navigate = useNavigate()
    const HOST = import.meta.env.VITE_API_HOST;
    const Alert = useContext(AlertContext);
    const [credentials, setCredentials] = useState({email:"", password:""})
    const [color, setColor] = useState("bg-gray-500")
    const [status, setStatus] = useState(false)

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    
    useEffect(()=>{
        if(validator.isEmail(credentials.email)  && credentials.password.match(/([^\s])/) && credentials.password.length>=8)
        {
          setColor("bg-light-blue-500")
        }
        else{
          setColor("bg-gray-500")
        }
    }, [credentials])


    const submitCredentials = async (e) =>{
      e.preventDefault()
      if(color == "bg-light-blue-500")
      {
        if(navigator.onLine){
  
            try{
              setStatus(true)
              let response = await fetch(`${HOST}/api/auth/signin`,  {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
              })

              let data = await response.json();

              if(response.status == 200)
              {
                localStorage.setItem('token', data.authToken)
                Alert.setAlert("Sign In Successfully.....","green");
                setStatus(false)
                navigate('/')
              }
              else{
                try{
                  let errors = data.errors
                  for(let i = 0; i<data.errors.length; i++)
                  {
                      Alert.setAlert(errors[i].msg,"red");
                  }
                  setStatus(false)
                }
                catch{
                  Alert.setAlert(data.error,"red");
                  setStatus(false)
                }
               
              }
            }
            catch(e)
            {
              Alert.setAlert("Try Again", "red");
            }
        }
        else{
          Alert.setAlert("Please Check Your Connection You are offline", "red");
        }
      }
      else{
        Alert.setAlert("fill out all the required fields", "red");
      }
    }

  return (
    <div className="py-0 px-5 lg:px-0 lg:py-0 flex justify-center lg:justify-end align-middle items-center w-full h-full "  style={{ backgroundImage: `url(${signupbg})` }}>
    <div className="w-full h-screen lg:flex hidden justify-center items-center overflow-hidden">
      <div className="h-[55rem] overflow-hidden">
        <Lottie loop animationData={signin} play className="w-full h-full" />
      </div>
    </div>

    <div className="h-screen flex justify-center items-start lg:items-center py-16 lg:py-20 px-5 lg:px-32 bg-white dark:bg-[#0f172a] ">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="dark:text-[#eee]">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal dark:text-[#eee]">
          Enter your details to sign in.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitCredentials}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" autoComplete="username" name="email" className="dark:text-[#eee]" value={credentials.email} onChange={onChange} />
            <Input
              type="password"
              size="lg"
              label="Password"
              autoComplete="current-password"
              className="dark:text-[#eee]"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>

          <Button className={`mt-6 ${color} hover:shadow-none shadow-none text-base lg:tracking-widest flex justify-center items-center`} type='submit' fullWidth>
            {status?<Spinner />:"Sign In"}
          </Button>
          <Typography color="gray" className="mt-4 text-center dark:text-[#eee] font-normal">
                Not have an account?
            <Link
              to="/signup"
              className="font-medium  text-light-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  </div>
  );
};

export default SignIn;

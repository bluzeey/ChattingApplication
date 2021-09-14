import React,{useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signinImage from '../assets/signup.jpg'
const cookies=new Cookies()
const initialState={
  fullName:'',
  username:'',
  password:'',
  confirmPassword:'',
  phoneNumber:'',
  avatarURL:''
}


const Auth = () => {
    const[form,setForm]=useState(initialState)
    const[isSignup,setisSignup]=useState(true)
    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const {fullName,username,password,phoneNumber,avatarURL}=form;
      const URL="http://localhost:5000/auth"
      const {data:{token,userId,hashedPassword}}= await axios.post (`${URL}/${isSignup ? 'signup':'signin'}`,{
        username,password,fullName,phoneNumber,avatarURL
      })

      cookies.set("token",token)
      cookies.set('username',username)
      cookies.set('fullname',fullName)
      cookies.set('userId',userId)
      
      if(isSignup){
        cookies.set('phoneNumber',phoneNumber)
        cookies.set('avatarURL',avatarURL)
        cookies.set('hashedPassword',hashedPassword)
      }
      
      window.location.reload();
    }
    const switchMode=()=>{
        setisSignup((previsSignup)=> !previsSignup)
    }
    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
             <div className='auth__form-container_fields-content'>
                 <p>{isSignup ? 'Sign Up':'Sign In'}</p>
                 <form onSubmit={handleSubmit}>
                      {isSignup && (
                          <div className='auth__form-container_fields-content_input'>
                              <label htmlFor='fullName'>
                                  Full Name
                                </label>
                              <input 
                              name="fullName"
                              type="text"
                              placeholder="full Name"
                              onChange ={handleChange}
                              required/>
                          </div>
                      )}
                        <div className='auth__form-container_fields-content_input'>
                              <label htmlFor='username'>
                                Username
                                </label>
                              <input 
                              name="username"
                              type="text"
                              placeholder="User Name"
                              onChange ={handleChange}
                              required/>
                          </div>
                        {isSignup && (
                          <div className='auth__form-container_fields-content_input'>
                              <label htmlFor='phonenumber'>
                                  Phone Number
                                </label>
                              <input 
                              name="phonenumber"
                              type="text"
                              placeholder="Phone Number"
                              onChange ={handleChange}
                              required/>
                          </div>
                        )}
                        {isSignup && (
                          <div className='auth__form-container_fields-content_input'>
                              <label htmlFor='AvatarURL'>
                                  AVATAR URL 
                                </label>
                              <input 
                              name="AvatarURL"
                              type="text"
                              placeholder="Avatar URL"
                              onChange ={handleChange}
                              required/>
                          </div>)}
                          <div className='auth__form-container_fields-content_input'>
                            {isSignup && ( <div className='auth__form-container_fields-content_input'>
                              <label htmlFor='password'>
                                Password
                                </label>
                              <input 
                              name="password"
                              type="password"
                              placeholder="Password"
                              onChange ={handleChange}
                              required/>
                          </div>)}
                              <label htmlFor='confirmPassword'>
                                 Confirm Password
                                </label>
                              <input 
                              name="confirmPassword"
                              type="password"
                              placeholder="Confirm Password"
                              onChange ={handleChange}
                              required/>
                          </div>
                          <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                          </div>
                 </form>
                   <div className="auth__form-container_fields-account">
                       <p>{isSignup ? 'Already have an Account':"Don't have a Account"}</p>
                       <span onClick={switchMode}>{isSignup ? 'Sign in':'Sign Up'}</span>
                   </div>
             </div>
            </div>
            <div className='auth__form-container_image'>
                 <img src={signinImage} alt='sign in'/>
                </div>  
        </div>
    )
}
export default Auth

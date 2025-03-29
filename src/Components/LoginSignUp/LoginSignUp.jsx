import React from 'react'
import './LoginSignUp.css'
const LoginSignUp = () => {
  return (
    <div className='container'>
         <div className="header">
            <div className="text">Sign Up</div>
             <div className="header"></div>
         </div>
        
        <div className="inputs">
            <div className="input">
                <img src="" alt="" />
                <input type="name" placeholder='Name'/>
            </div>
            <div className="input">
                <img src="" alt="" />
                <input type="surname" placeholder='Surname'/>
            </div>  
            <div className="input">
                <img src="" alt="" />
                <input type="username" placeholder='Username/Email' />
            </div>      
            <div className="input">
                <img src="" alt="" />
                <input type="password" placeholder='Password' />
            </div>
            <div className="input">
                <img src="" alt="" />
                <input type="Re-enterpassword" placeholder='Re-enter Password'/>
            </div>
            <div className="input">
                <img src="" alt="" />
                <input type="Phone number" placeholder='Phone Number'/>
            </div>
        </div>
        <div className="Forgot-password">Forgot password ? <span>Click here</span></div>
        <div className="submit-container">
            <div className="Submit">Sign Up</div>
            <div className="Submit">Login</div>
        </div>
    </div>
  )
}

export default LoginSignUp


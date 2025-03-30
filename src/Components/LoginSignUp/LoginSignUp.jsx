import React, { useState } from 'react'
import './LoginSignUp.css'
const LoginSignUp = () => {
     
  const[action, setAction] = useState("Sign Up");

  return (
    <div className='container'>
         <div className="header">
            <div className="text">{action}</div>
             <div className="header"></div>
             <div className="underline"></div>
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
            <div className={action==="Login"?"submit gray": "submit"}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray": "submit"} >Login</div>
        </div>
    </div>
  )
}

export default LoginSignUp


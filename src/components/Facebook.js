/** This component fetches user information and creates the Facebook log in*/
import React, {useState} from 'react';
import FBLogIn from 'react-facebook-login';
import axios from 'axios';


import '../scss-style/Facebook.scss'; 

const  Facebook = () => {

    let facebookContent; 

    //States 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [timeStamp, setTimeStamp] = useState('This is your first log in!'); 

    //This function will get user information from MySQL database and also insert information
    const getUserInfo = (name, email) => {
        var dbUrl = 'http://localhost:8000/' + email 
        var logInTime = Date(Date.now()); 
        
        //GET request to localhost
        axios.get(dbUrl)
        .then(res => {
            const userInfo = res.data
            userInfo.map(info => (
                setTimeStamp(info.history)
            )) 
        })

        //POST request to localhost
        axios.post('http://localhost:8000/', {
            user_name: name, 
            user_email: email,
            time_stamp: logInTime
        })
        .then(res=>{
            console.log(res)
            console.log(res.data)
        });

    }

    //This function will run when response from Facebook Oauth2 is recived
    const responseFacebook = (response) => {
        setIsLoggedIn(true); 
        setUserID(response.userID); 
        setName(response.name);
        setEmail(response.email);
        setPicture(response.picture.data.url);
        
        getUserInfo(response.name, response.email); 
        window.history.pushState("", "", '/callback');
    }
    
    
    if(isLoggedIn){
        facebookContent = (
            <div className="information-box">
                <img src={picture} alt={name} />
                <h2 className="text">Welcome {name}!</h2>
                <h3 className="text">E-mail: {email}</h3>
                <h3 className="text">Last time you logged in was:</h3>
                <h5>{timeStamp}</h5>
            </div>
        );
    }else{
        facebookContent = (
            <div className="information-box">
                <FBLogIn
                appId="237723284010192"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                />
            </div>
        );
    }
    
    return (
        <div id="facebook">{facebookContent}</div>
    );
}

export default Facebook;
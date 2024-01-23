import { NavLink } from 'react-router-dom';
import Store from './helpers/storage';
import { useHistory } from 'react-router-dom';
import felowaxLogo  from './images/logo.png';
import { useEffect, useState } from 'react';
const Navigation = () =>{
     const history = useHistory();
     const [user, setUser] = useState(null);
   useEffect(()=>{
    let log = Store.getLocalStorage('log');
    if(log.logged === true)
   {
         setUser(true);
   }
   else
   {
      setUser(null);
   }
   },[])
    const handleLogin=()=>{
        let log = Store.getLocalStorage('log');
        if(log.logged === 'true')
        {
        
        }
        else
        {
        
       history.push('/');
        }
    }
    const handleLogout =()=>{
        let logData = Store.getLocalStorage('log');
        logData.logged = false;
        localStorage.setItem('log',JSON.stringify(logData));
        window.location.reload();
    }
   return(
    <div className = "nav-bar">
        <p>JOYCELYN ENTERPRISE</p>
        <div className = "links">
        <NavLink to = "/search">Sell</NavLink>
        <NavLink to = "/add">Add</NavLink>
        <NavLink to = "/store">Store</NavLink>
        <NavLink to = "/records">Records</NavLink>
        {!user && <span onClick = {handleLogin} className = "log-style">login</span>}
        {user && <span onClick = {handleLogout} className = "log-style">logout</span>}
        </div>
        
    </div>
   )
}
export default Navigation;
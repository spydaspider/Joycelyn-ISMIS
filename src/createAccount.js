import { useState } from 'react';
import useFetch from './useFetch.js';
import {useHistory} from 'react-router-dom';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
const CreateAccount = () =>{
   const [username,setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [passwordAgain, setPasswordAgain] = useState('');
   const [passMatch, setPassMatch] = useState(true);
   const [nameTaken, setNameTaken]= useState(false);
   const history = useHistory();
   const {data: users, isPending: isLoading, error} = useFetch('http://localhost:7600/users');
   const handleSubmit = (e) =>{
      let count = 0;
      e.preventDefault();
      if(users)
      {
            users.forEach((user)=>{
         if(user.username.toLowerCase() === username.toLowerCase())
         {
           count += 1;

         }
       
      })
   }
      if(count !== 0)
      {
         setNameTaken(true);
         setPassMatch(true);
      }
      else if(password !== passwordAgain)
      {
         setPassMatch(false);
         setNameTaken(false);

      }
      else
      {
         //Proceed to save the users.
         const newUsers = {username,password};
         fetch('http://localhost:7600/users',{
            method: 'POST',
            headers: {"Content-type":"Application/json"},
            body: JSON.stringify(newUsers)
            

         }).then(()=>{
             history.push('/');
         })

      }

   }
   return (
      <div className = "create-account-wrapper">
    <div className = "create-account">
      <h2 className = "create-account-title">Create Account</h2>
         {nameTaken && <p className = "create-account-error">Username is already taken</p>}
         {!passMatch && <p className = "create-account-error">Passwords do not match</p>}

         <form onSubmit = {handleSubmit}>
               <input type = "text" value = {username} onChange = {(e)=>{setUsername(e.target.value)}} placeholder = "Username" required />
               <input type = "password" value = {password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder = "password" required />
               <input type = "password" value = {passwordAgain} onChange = {(e)=>{setPasswordAgain(e.target.value)}} placeholder = "password again" required/>
               <button>create account</button>
         </form>
   
    </div>
    </div>
   )
}
export default CreateAccount;

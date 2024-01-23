import HomePage from './HomePage';
import useFetch from './useFetch';
import CreateAccount from './createAccount.js';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Store from './helpers/storage';
import Login from './login.js';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Navigation from './nav';
import AddToStore from './add';
import ItemList from './itemList';
import LogMessage from './logMessage.js';
import ItemDetails from './itemDetails.js';
import Records from './records.js';
function App() {
  const [loggedIn,setLoggedIn] = useState(false);
 
  const {data: items, isPending: isLoading, error} = useFetch('http://localhost:7600/items');
  let log = Store.getLocalStorage('log');

    const useLogin =()=>{
      useEffect(()=>{
      if(log.logged === false || (localStorage.getItem('log') === null))
      {
        
        setLoggedIn(false);
      }
      else 
      {
      
         setLoggedIn(true);
      }
    },[])
    }
    useLogin();
    
 
  
  

  return (
    <Router>
      <Navigation />
    <div className="App">
    <div className = "content">
        <Switch>
          <Route exact path = "/">
            <Login />

          </Route>
          <Route path = "/signup">
          
            <CreateAccount />
          </Route>
          <Route path = "/search">
            {loggedIn && <HomePage />}
            {!loggedIn && <LogMessage/>}
            </Route>
            <Route path = "/add">
              {loggedIn && <AddToStore />}
              {!loggedIn && <LogMessage/>}

            </Route>
            <Route path = "/store">
            {!loggedIn && <LogMessage/>}
         {loggedIn && items && <ItemList items = {items} title = "All Items In the Store"/>}
            </Route>
            <Route path = "/items/:id">
              <ItemDetails />

            </Route>
            <Route path = "/records">
            {!loggedIn && <LogMessage/>}
             {loggedIn && <Records />}
            </Route>
          
        </Switch>
    </div>
    
    </div>
    
  </Router>
  );
}
 
export default App;

import './App.scss';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {app} from './Firebase/firebase';
import './Components/MainContainer.scss';
import Protected from "./Components/Protected";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(getAuth(app), (user) => {
            if (user) {
                setUser(user);
                console.log(user);
            } else {
                setUser(false);
                console.log('user: ',user);
            }
            console.log('Działanie z useEffecta', user)
        });
    },[error]);

    return (
          <div className="App gradient_background">

              <BrowserRouter>
                  {!user  &&  <nav className={"form-navigation-inner"}>
                                  <NavLink to="/" >Login</NavLink>
                                  <NavLink to="/register">Register</NavLink>
                             </nav>
                  }

                  <Routes>
                      <Route exact path="/" element={<Login email={email}
                                                            setEmail={setEmail}
                                                            password={password}
                                                            setPassword={setPassword}
                                                            error={error}
                                                            setError={setError}
                                                            app={app}/>}
                      />

                      <Route  path="/register" element={<Register email={email}
                                                                  setEmail={setEmail}
                                                                  password={password}
                                                                  setPassword={setPassword}
                                                                  error={error}
                                                                  setError={setError}
                                                                  app={app}    />   }
                      />
                      <Route  path="/protected/:id" element={<Protected user={user}
                                                                        setUser={setUser}/> }
                      />
                  </Routes>
              </BrowserRouter>
          </div>
  );
}

export default App;

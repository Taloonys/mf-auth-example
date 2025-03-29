import React, {lazy, Suspense, useEffect, useState} from "react";                          // for lazy remote load
import ReactDOM from "react-dom";

import "./index.css";
// import "./images/logo.svg"


const UserLogin = lazy(() => import('users/UserLogin')                          // lazy loading remote module
  .catch(() => {
    return {
      default:() => <div className="error">UserLogin component is not available</div>
    }
  })
);


const Welcome  = lazy(() => import('users/Welcome')
  .catch(() => {
    return {
      default:() => <div className="error">Welcome component is not available</div>
    }
  })
);


const TaskList = lazy(() => import('tasks/TaskList')
  .catch(() => {
    return {
      default:() => <div className="error">TaskList component is not available</div>
    }
  })
);


function App () {
  const [jwt, setJwt] = useState('');

  const handleJwtChange = event => {
    setJwt(event.detail)
  } 

  useEffect(() => {
    //
    // We added new CustomEvent("jwt-change") in Login.js
    //
    addEventListener("jwt-change", handleJwtChange);

    return () => removeEventListener("jwt-change", handleJwtChange);
  }, []);


  return (
      <div className='container'>

          <header className='App-header'>
              Лабораторная работа по микрофронтендам
          </header>

          <section className='App-content'>
              {jwt 
                ? (<>
                  <Suspense fallback="loading..">
                    <Welcome jwt={jwt} />
                  </Suspense>
                  <Suspense fallback="loading..">
                    <TaskList jwt={jwt} />
                  </Suspense>
                  </>) 
                : (
                  <Suspense fallback="loading..">
                    <UserLogin/>
                  </Suspense>
              )}
          </section>

      </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

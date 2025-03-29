import React, {lazy, Suspense} from "react";                          // for lazy remote load
import ReactDOM from "react-dom";

import "./index.css";


const UsersTestControl = lazy(() => import('users/UsersTestControl')  // lazy loading remote module
  .catch(() => {
    return {
      default:() => <div className="error">Users component is not available</div>
    }
  })
);


const TasksTestControl = lazy(() => import('tasks/TasksTestControl')
  .catch(() => {
    return {
      default:() => <div className="error">Tasks component is not available</div>
    }
  })
)


const App = () => (
  <div className="container">
    <Suspense fallback="loading...">
      <UsersTestControl></UsersTestControl>
    </Suspense>
    <Suspense fallback="loading...">
      <TasksTestControl></TasksTestControl>
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

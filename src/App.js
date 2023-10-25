import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./sass/pars.scss";

import AdminPanel from "./Admin/admin";
import Users from './Admin/users/users';




function App() {

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <AdminPanel/>
            }
          >
            <Route path="/" element={<Users />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;

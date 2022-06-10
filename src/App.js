import "./App.scss";
import React from "react";
import Landing from "./components/landing/Landing.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "./components/CreatePool/Create";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./main.js";
import Login from "./components/Login/Login";
import Edit from "./components/EditPool/Edit";
function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

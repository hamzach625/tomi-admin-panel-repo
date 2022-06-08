import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../utils/ApiUrl";
import Loader from "../../hooks/loader";
import "./login.scss";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  const history = useHistory();
  const [mainLoader, setMainLoader] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const Signin = (e) => {
    setMainLoader(true);
    e.preventDefault();
    if (email && password) {
      axios
        .post(API_URL + "/v1/admin/login", { email, password })
        .then((response) => {
          if (response) {
            setMainLoader(false);
            const token = response.data.token;
            localStorage.setItem("mytoken", token);
            // setOpen(false)
            history.push("/landing");
            // window.$('#qrcode').modal('show')
          }
        })
        .catch((err) => {
          setMainLoader(false);
          // console.log("response in login", err.response?.data.doesSecretKeyFound)
          // window.$('#onlyinput').modal('show')
          // setOpen(false)
          swal("Invalid Credentials!!!", err, "error");
          // toast.error(err.response?.data.msg, {
          //     position: "top-center",
          //     autoClose: 2000,
          // });
        });
    } else {
      setMainLoader(false);
      swal("Invalid Credentials!", `Try Again`, "Error");
    }
  };
  return (
    <>
      {mainLoader && <Loader />}
      <section className="main-createnew ptb mt-sm-0 mt-5">
        <div className="container">
          <div className="row">
            <div className=" col-xl-6 col-lg-6 col-12 m-auto">
              <div className="forgot_card">
                <div className="inner-content text-center">
                  <img
                    src=".\assests\logo\logo.svg"
                    alt="img"
                    className="img-fluid "
                  />
                </div>
                <div className="">
                  <h3 className="">
                    <strong>log into your account</strong>
                  </h3>
                  <p className="mb-3">
                    Please enter your credentials below to log into your
                    account.
                  </p>
                  <div class="form-group   my-2 input_content">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      id=""
                      class="form-control"
                      placeholder="UserName"
                      required
                    />
                  </div>
                </div>
                <div class="form-group    my-2 input_content">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    class="form-control "
                    placeholder="Password"
                    required
                  />
                  <img src="\eye.png" class="text-center img-fluid  " alt="" />
                </div>
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1" className="label-rem">
                    Remember me
                  </label>
                </div>
                <div className="">
                  <button
                    type="button"
                    class="btn-commonrr  btn-lg btn-block"
                    onClick={Signin}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

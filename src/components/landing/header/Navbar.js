import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "./navbar.scss";
import { useHistory } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const history = useHistory();
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const logout1 = () => {
    localStorage.clear();
    history.push("/");
  };

  const connectMetamask = () => {
    localStorage.setItem("connectorId", "injected");
    login("injected");
    localStorage.setItem("flag", "true");
  };

  const trustWallet = async () => {
    localStorage.setItem("connectorId", "walletconnect");
    if (account) {
      logout();
    } else {
      login("walletconnect");
    }
  };

  const logoutt = () => {
    localStorage.setItem("flag", "false");
    logout();
  };

  return (
    <>
      <section className="main-navbar">
        <div className="container-fluid padd">
          <div className="row">
            <div className="col-xl-11 col-lg-11 m-auto padd">
              <nav className="navbar ptb20 navbar-expand-xl">
                <NavLink to="/landing" className="navbar-brand">
                  <img
                    src="/assests\logo\logo.svg"
                    alt=""
                    className="img-fluid hbdsjbd"
                  />
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="togg">
                    <i class="fas fa-bars"></i>
                  </span>
                </button>

                <div
                  className="collapse navbar-collapse marg"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <Link to="/landing" class="nav-link">
                        {" "}
                        Pool <span class="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li class="nav-item ">
                      <Link to="/create" class="nav-link ">
                        Create Pool{" "}
                      </Link>
                    </li>
                  </ul>
                  <div className="align-left">
                    {account ? (
                      <p className="connected-tag">
                        Connected: <span>{account}</span>{" "}
                      </p>
                    ) : (
                      ""
                    )}
                    {account ? (
                      <div>
                        {" "}
                        <button
                          type="button"
                          class="btn-yellow sbvsx mr-2"
                          onClick={logoutt}
                          // data-toggle="modal"
                          // data-target="#myModal2"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        class="btn-yellow sbvsxvv"
                        data-toggle="modal"
                        data-target="#myModal2"
                      >
                        Connect wallet
                      </button>
                    )}
                    <button
                      type="button"
                      class="btn-yellow sbvsx"
                      onClick={logout1}
                      // data-toggle="modal"
                      // data-target="#myModal2"
                    >
                      <img
                        src="/assests\logo\logout_icon.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Logout
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal right fade"
        id="myModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="./assests\CardsImg\close.svg"
                  className="img-fluid"
                  alt="img"
                />
              </button>
              <div className="upper_text">
                <h4 class="modal-title heading_modal" id="myModalLabel2">
                  Connect Wallet
                </h4>
                <p className="para_modal">
                  By connecting your wallet, you agree to our <br />
                  <a href="//"> Terms of Service</a> and Our{" "}
                  <a href="//">Privacy Policy</a> .
                </p>
              </div>
            </div>

            <div class="modal-body">
              <div className="inner_btn">
                <button
                  type="button"
                  className="btn btn-btn-button d-block mb_bottom"
                  onClick={connectMetamask}
                  data-dismiss="modal"
                >
                  <img
                    src="./assests\CardsImg\metamas.svg"
                    className="img-fluid"
                    alt="img"
                  />
                  Metamask
                </button>
                <button
                  type="button"
                  className="btn btn-btn-button "
                  onClick={trustWallet}
                  data-dismiss="modal"
                >
                  <img
                    src="./assests\CardsImg\wal.svg"
                    className="img-fluid "
                    alt="img"
                  />
                  WalletConnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

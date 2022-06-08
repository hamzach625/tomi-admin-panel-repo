import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./banner.scss";
import { API_URL } from "../../../utils/ApiUrl";
import axios from 'axios';

const Banner = () => {
  const [option, setOption] = useState("1");
  const [allpools, setallpools] = useState()
  const [search, setSearch] = useState('')
  const getallpools = () => {
    axios.post(`${API_URL}/v1/pool/getAllPools`)
      .then((response) => {
        // setOpens(false)
        setallpools(response.data.allPools)
        console.log("All KYC we have", response.data.allPools)
      })
      .catch((err) => {
        console.log("errrrrr", err)
        // setOpens(false)
        // toast.warning('Error While Geting Detail', {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        return false;
      })
  }
  const handleSearchnew = (e) => {
    const hgf = e.target.value;
    setSearch(hgf);
  }

  console.log("hsgdhghdgdghd", allpools)

  const allkycproject = allpools?.filter((elem) => {
    if (search === null) {
      return elem
    }
    else if (elem?.poolName?.toLowerCase().includes(search.toLowerCase())) {
      return (
        <tr>
          <td className=" gj">{elem?.poolName}</td>
          <td className="ghj">
            <div className="main">
              <div className="parent">
                <div className="inner1">
                  <img
                    src={elem?.stakingTokenLogo}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="inner2">
                  <img
                    src={elem?.rewardTokenLogo}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="para">
                <p className="pOnDark">{elem?.stakingTokenSymbol}-{elem?.rewardTokenSymbol} </p>
              </div>
            </div>
          </td>
          <td className="common-color gj">${elem?.maxSupplyOfRewadPool}</td>
          <td className="date gj">{elem?.ApyPerscentage}%</td>
          <td>
            <Link to="/edit">
              <button className="btn-common buttonCustom m-0">
                Edit
              </button>
            </Link>
          </td>
        </tr>
      )
    }
  })
    .map((elem) => {
      return (
        <tr>
          <td className=" gj">{elem?.poolName}</td>
          <td className="ghj">
            <div className="main">
              <div className="parent">
                <div className="inner1">
                  <img
                    src={elem?.stakingTokenLogo}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="inner2">
                  <img
                    src={elem?.rewardTokenLogo}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="para">
                <p className="pOnDark">{elem?.stakingTokenSymbol}-{elem?.rewardTokenSymbol} </p>
              </div>
            </div>
          </td>
          <td className="common-color gj">${elem?.maxSupplyOfRewadPool}</td>
          <td className="date gj">{elem?.ApyPerscentage}%</td>
          {/* <td className="hhhhh gj">Live</td> */}
          <td>
            <Link to="/edit">
              <button className="btn-common buttonCustom m-0">
                Edit
              </button>
            </Link>
          </td>
        </tr>
      )
    })

  useEffect(() => {
    getallpools()
  }, [])

  return (
    <>
      <section className="pool">
        <Navbar />
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-xl-11 col-12 m-auto">
              <div className="option-wrap">
                {/* <div className="group_btn">
                  <div
                    className={`option ${option === "1" ? "selected" : ""}`}
                    onClick={(e) => setOption("1")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${option === "2" ? "selected" : ""}`}
                    onClick={(e) => setOption("2")}
                  >
                    Live
                  </div>
                  <div
                    className={`option ${option === "3" ? "selected" : ""}`}
                    onClick={(e) => setOption("3")}
                  >
                    Finished
                  </div>
                </div> */}
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "200px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Search Pool"
                    variant="outlined"
                    value={search}
                    name="search"
                    onChange={handleSearchnew}
                  />
                </Box>
              </div>

              <div className="table-main ">
                <div className="row">
                  <div className="col-12 p-0">
                    <div className="">
                      <div className="table-responsive">
                        <table class="table custom-table">
                          <thead>
                            <tr>
                              <th className="th_name" scope="col">
                                Pairs
                              </th>
                              <th className="th_name" scope="col">
                                Supply
                              </th>
                              <th className="th_name" scope="col">
                                APR
                              </th>
                              {/* <th className="th_name" scope="col">
                                Status
                              </th> */}
                              <th className="th_name" scope="col">
                                Details
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {allkycproject} */}
                            
                            <tr>
                              <td className="ghj">
                                <div className="main">
                                  <div className="parent">
                                    <div className="inner1">
                                      <img
                                        src="./assests\logo\testing.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="inner2">
                                      <img
                                        src="./assests\logo\testing1.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                  <div className="para">
                                    <p className="pOnDark">BNB-BUSD </p>
                                  </div>
                                </div>
                              </td>
                              <td className="common-color gj">$124,213,453</td>
                              <td className="date gj">165.17%</td>
                              <td className="hhhhh gj">Live</td>
                              <td>
                                <Link to="/create">
                                  <button className="btn-common buttonCustom m-0">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td className="ghj">
                                <div className="main">
                                  <div className="parent">
                                    <div className="inner1">
                                      <img
                                        src="./assests\logo\testing.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="inner2">
                                      <img
                                        src="./assests\logo\testing1.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                  <div className="para">
                                    <p className="pOnDark">BNB-BUSD </p>
                                  </div>
                                </div>
                              </td>
                              <td className="common-color gj">$124,213,453</td>
                              <td className="date gj">165.17%</td>
                              <td className="hhhhh gj">Live</td>
                              <td>
                                <Link to="/create">
                                  <button className="btn-common buttonCustom m-0">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td className="ghj">
                                <div className="main">
                                  <div className="parent">
                                    <div className="inner1">
                                      <img
                                        src="./assests\logo\testing.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="inner2">
                                      <img
                                        src="./assests\logo\testing1.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                  <div className="para">
                                    <p className="pOnDark">BNB-BUSD </p>
                                  </div>
                                </div>
                              </td>
                              <td className="common-color gj">$124,213,453</td>
                              <td className="date gj">165.17%</td>
                              <td className="hhhhh gj">Live</td>
                              <td>
                                <Link to="/create">
                                  <button className="btn-common buttonCustom m-0">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td className="ghj">
                                <div className="main">
                                  <div className="parent">
                                    <div className="inner1">
                                      <img
                                        src="./assests\logo\testing.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="inner2">
                                      <img
                                        src="./assests\logo\testing1.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                  <div className="para">
                                    <p className="pOnDark">BNB-BUSD </p>
                                  </div>
                                </div>
                              </td>
                              <td className="common-color gj">$124,213,453</td>
                              <td className="date gj">165.17%</td>
                              <td className="hhhhh gj">Live</td>
                              <td>
                                <Link to="/create">
                                  <button className="btn-common buttonCustom m-0">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td className="ghj">
                                <div className="main">
                                  <div className="parent">
                                    <div className="inner1">
                                      <img
                                        src="./assests\logo\testing.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="inner2">
                                      <img
                                        src="./assests\logo\testing1.svg"
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                  </div>
                                  <div className="para">
                                    <p className="pOnDark">BNB-BUSD </p>
                                  </div>
                                </div>
                              </td>
                              <td className="common-color gj">$124,213,453</td>
                              <td className="date gj">165.17%</td>
                              <td className="hhhhh gj">Live</td>
                              <td>
                                <Link to="/create">
                                  <button className="btn-common buttonCustom m-0">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

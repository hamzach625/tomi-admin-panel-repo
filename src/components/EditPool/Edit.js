import React, { useEffect, useState } from "react";
import Navbar from "../landing/header/Navbar";
import Loader from "../../hooks/loader";
import axios from "axios";
import { toast } from "react-toastify";
import "./edit.scss";
import { useHistory } from "react-router-dom";
import {
  getFactoryContract,
  getStakeBNBtoBNB,
  getStakeBNBtoToken,
  getStakeTokentoToken,
  getStakeTokentoBNB,
} from "../../utils/contractHelpers";
import Environment from "../../utils/Environment";
import { useWeb3React } from "@web3-react/core";
import { API_URL } from "../../utils/ApiUrl";
import { useCallback } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { InputSharp } from "@material-ui/icons";

const Edit = (props) => {
  const id = props.match.params.id;
  const [userDetail, setUserDetail] = useState();
  console.log("idddd", id);
  const history = useHistory();
  const [mainLoader, setMainLoader] = useState(false);
  const [isLive, setIsLive] = useState();
  const [isLiveUnstake, setIsLiveUnstake] = useState();
  const web3 = useWeb3();
  const { account } = useWeb3React();
  const [token1, settoken1] = useState();
  const [token, settoken] = useState();
  const [MyFiles, setMyFiles] = useState();
  const [MyFiles1, setMyFiles1] = useState();
  const [isBNB, setisBNB] = useState({
    StakingTokenName: "Binance Coin",
    StakingTokenSymbol: "BNB",
    StakingTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    StakingTokenDecimals: "18",
  });
  const [inputs, setInputs] = useState({
    poolName: "",
    tokenBNB: false,
    StakingTokenName: "",
    StakingTokenSymbol: "",
    StakingTokenAddress: "",
    StakingTokenDecimals: "",
    rewardBNB: false,
    rewardTokenName: "",
    rewardTokenSymbol: "",
    rewardTokenAddress: "",
    rewardTokenDecimals: "",
    lockPeriod: "",
    apy: "",
    rewardWalletAddress: "",
    maxSupplyReward: "",
    autoCompound: false,
    PreUnstaking: false,
    feeUnstaking: "",
  });
  const {
    tokenBNB,
    StakingTokenName,
    StakingTokenSymbol,
    StakingTokenAddress,
    StakingTokenDecimals,
    rewardTokenName,
    rewardTokenSymbol,
    rewardTokenAddress,
    rewardTokenDecimals,
  } = inputs;

  console.log("inputs fields", userDetail);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const getdata = () => {
    setMainLoader(true);
    axios
      .post(`${API_URL}/v1/pool/getPoolById`, { _id: id })
      .then((response) => {
        setUserDetail(response.data.pool);
        settoken(response.data.pool.stakingTokenLogo);
        settoken1(response.data.pool.rewardTokenLogo);
        setMainLoader(false);
      })
      .catch((err) => {
        setMainLoader(false);
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  const pauseStaking = async () => {
    setMainLoader(true);
    let contract = "";
    try {
      if (userDetail.isStakingTokenBnb && userDetail.isRewardTokenBnb) {
        // deployNewCollection = "createBnbForBnb";
        contract = getStakeBNBtoBNB(userDetail.contractAddress, web3);
        console.log("BNBTOBNB");
      } else if (
        userDetail.isStakingTokenBnb &&
        userDetail.isRewardTokenBnb == false
      ) {
        contract = getStakeBNBtoToken(userDetail.contractAddress, web3);
        console.log("BNBToToken");
      } else if (
        userDetail.isStakingTokenBnb == false &&
        userDetail.isRewardTokenBnb
      ) {
        contract = getStakeTokentoBNB(userDetail.contractAddress, web3);
        console.log("TokenTOBNB");
      } else {
        contract = getStakeTokentoToken(userDetail.contractAddress, web3);
        console.log("TokenTOTOken");
      }
      console.log("ressssss contra", contract);
      const res = await contract.methods
        .flipStakeState()
        .send({ from: account });
      if (res) {
        setIsLive(res);
        setMainLoader(false);
      } else {
        setMainLoader(false);
      }

      console.log("resssss", res);
      // let total = parseInt(res)
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      throw err;
    }
    setMainLoader(true);
  };

  const pauseUnStaking = async () => {
    setMainLoader(true);
    let contract = "";
    try {
      if (userDetail.isStakingTokenBnb && userDetail.isRewardTokenBnb) {
        // deployNewCollection = "createBnbForBnb";
        contract = getStakeBNBtoBNB(userDetail.contractAddress, web3);
        console.log("BNBTOBNB");
      } else if (
        userDetail.isStakingTokenBnb &&
        userDetail.isRewardTokenBnb == false
      ) {
        contract = getStakeBNBtoToken(userDetail.contractAddress, web3);
        console.log("BNBToToken");
      } else if (
        userDetail.isStakingTokenBnb == false &&
        userDetail.isRewardTokenBnb
      ) {
        contract = getStakeTokentoBNB(userDetail.contractAddress, web3);
        console.log("TokenTOBNB");
      } else {
        contract = getStakeTokentoToken(userDetail.contractAddress, web3);
        console.log("TokenTOTOken");
      }
      const res = await contract.methods
        .flipUnStakeState()
        .send({ from: account });
      if (res) {
        setIsLiveUnstake(res);
        setMainLoader(false);
      } else {
        setMainLoader(false);
      }

      // let total = parseInt(res)
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      throw err;
    }
  };

  const getpauseStatusStaking = async () => {
    let contract = "";
    if (userDetail.isStakingTokenBnb && userDetail.isRewardTokenBnb) {
      // deployNewCollection = "createBnbForBnb";
      contract = getStakeBNBtoBNB(userDetail.contractAddress, web3);
      console.log("BNBTOBNB");
    } else if (
      userDetail.isStakingTokenBnb &&
      userDetail.isRewardTokenBnb == false
    ) {
      contract = getStakeBNBtoToken(userDetail.contractAddress, web3);
      console.log("BNBToToken");
    } else if (
      userDetail.isStakingTokenBnb == false &&
      userDetail.isRewardTokenBnb
    ) {
      contract = getStakeTokentoBNB(userDetail.contractAddress, web3);
      console.log("TokenTOBNB");
    } else {
      contract = getStakeTokentoToken(userDetail.contractAddress, web3);
      console.log("TokenTOTOken");
    }
    console.log("ressssss contra", contract);
    const res = await contract.methods.isStakeActive().call();
    setIsLive(res);
    console.log("resssss", res);
    // let total = parseInt(res)
  };
  const getpauseStatusUnStaking = async () => {
    let contract = "";
    if (userDetail.isStakingTokenBnb && userDetail.isRewardTokenBnb) {
      // deployNewCollection = "createBnbForBnb";
      contract = getStakeBNBtoBNB(userDetail.contractAddress, web3);
      console.log("BNBTOBNB");
    } else if (
      userDetail.isStakingTokenBnb &&
      userDetail.isRewardTokenBnb == false
    ) {
      contract = getStakeBNBtoToken(userDetail.contractAddress, web3);
      console.log("BNBToToken");
    } else if (
      userDetail.isStakingTokenBnb == false &&
      userDetail.isRewardTokenBnb
    ) {
      contract = getStakeTokentoBNB(userDetail.contractAddress, web3);
      console.log("TokenTOBNB");
    } else {
      contract = getStakeTokentoToken(userDetail.contractAddress, web3);
      console.log("TokenTOTOken");
    }
    const res = await contract.methods.isUnStakeActive().call();
    setIsLiveUnstake(res);
    console.log("Unstakeresssss", res);
    // let total = parseInt(res)
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, lockPeriod: value }));
  };

  const handletoken = (evt) => {
    if (evt.target.files) {
      const filesarray = Array.from(evt.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      settoken(filesarray);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles(file);
  };
  console.log("argggginputssss", token);
  console.log("argggginputssssbnb", token1);
  const handletoken11 = (evt) => {
    console.log("sjjsjssjlskjk");
    if (evt.target.files) {
      const filesarray = Array.from(evt.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      settoken1(filesarray);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles1(file);
  };

  const CreatePool = async () => {
    setMainLoader(true);
    let arg = "";
    let deployNewCollection = "";
    if (userDetail.tokenBNB && userDetail.rewardBNB) {
      deployNewCollection = "createBnbForBnb";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: userDetail.PreUnstaking
          ? userDetail.feeUnstaking.toString()
          : 0,
      };
    } else if (userDetail.tokenBNB && userDetail.rewardBNB == false) {
      deployNewCollection = "createBnbForToken";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: userDetail.PreUnstaking
          ? userDetail.feeUnstaking.toString()
          : 0,
        _rewardingToken: userDetail.rewardTokenAddress,
        _rewardingTokenWallet: account,
      };
    } else if (userDetail.tokenBNB == false && userDetail.rewardBNB) {
      deployNewCollection = "createTokenForBnb";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: userDetail.PreUnstaking
          ? userDetail.feeUnstaking.toString()
          : 0,
        _stakeToken: userDetail.tokenBNB
          ? isBNB.StakingTokenAddress
          : userDetail.StakingTokenAddress,
      };
    } else {
      deployNewCollection = "createTokenForToken";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: inputs.PreUnstaking
          ? inputs.feeUnstaking.toString()
          : 0,
        _stakeToken: inputs.tokenBNB
          ? isBNB.StakingTokenAddress
          : inputs.StakingTokenAddress,
        _rewardingToken: inputs.rewardTokenAddress,
        _rewardingTokenWallet: account,
      };
    }

    console.log("argggg", Environment.factoryContarct);

    try {
      const contract = getFactoryContract(Environment.factoryContarct, web3);
      const approved = await contract.methods[deployNewCollection](arg)
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
      const data1 = new FormData();
      data1.append("contractAddress", approved.events[0].address);
      data1.append("poolName", inputs.poolName);
      data1.append(
        "stakingTokenName",
        inputs.tokenBNB == true ? isBNB.StakingTokenName : StakingTokenName
      );
      data1.append(
        "stakingTokenSymbol",
        inputs.tokenBNB == true ? isBNB.StakingTokenSymbol : StakingTokenSymbol
      );
      data1.append("stakingTokenLogo", MyFiles);
      data1.append(
        "stakingTokenAddress",
        inputs.tokenBNB == true
          ? isBNB.StakingTokenAddress
          : StakingTokenAddress
      );
      data1.append(
        "stakingDecimals",
        inputs.tokenBNB == true
          ? isBNB.StakingTokenDecimals
          : StakingTokenDecimals
      );
      data1.append(
        "rewardTokenName",
        inputs.rewardBNB == true ? isBNB.StakingTokenName : rewardTokenName
      );
      data1.append(
        "rewardTokenSymbol",
        inputs.rewardBNB == true
          ? isBNB.StakingTokenDecimals
          : rewardTokenSymbol
      );
      data1.append("rewardTokenLogo", MyFiles1);
      data1.append(
        "rewardTokenAddress",
        inputs.rewardBNB == true
          ? isBNB.StakingTokenAddress
          : rewardTokenAddress
      );
      data1.append(
        "rewardDecimals",
        inputs.rewardBNB == true
          ? isBNB.StakingTokenDecimals
          : rewardTokenDecimals
      );
      data1.append("lockPeriod", inputs.lockPeriod);
      data1.append("rewardWalletAddress", account);
      data1.append("maxSupplyOfRewadPool", inputs.maxSupplyReward);
      data1.append("ApyPerscentage", inputs.apy);
      data1.append("isStakingTokenBnb", inputs.tokenBNB);
      data1.append("isRewardTokenBnb", inputs.rewardBNB);
      data1.append("allowPrematureUnstaking", inputs.PreUnstaking);
      data1.append("autoCompound", inputs.autoCompound);
      data1.append("feeForPrematureUnstaking", inputs.feeUnstaking);

      console.log("apppr", data1);
      axios
        .post(`${API_URL}/v1/pool/createpool`, data1, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setMainLoader(false);
          history.push("/landing");
          toast.success("Pool Created Successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          // singleprojectdetail()
        })
        .catch((err) => {
          setMainLoader(false);
        });
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      throw err;
    }
  };

  const handleTokenCHeckbox = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, tokenBNB: value }));
  };

  const handleRewardCHeckbox = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, rewardBNB: value }));
  };

  const handleCompound = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, autoCompound: value }));
  };

  const handlepremature = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, PreUnstaking: value }));
  };

  useEffect(() => {
    getdata();
    getpauseStatusStaking();
    getpauseStatusUnStaking();
  }, [id, account]);

  return (
    <>
      {mainLoader && <Loader />}
      <Navbar />
      <section className="create">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-11 col-12 m-auto">
              <div className="pool-detail box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Pool Details</h5>
                  <img
                    src="/assests/line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="input-field">
                  <p>Pool Name</p>
                  <input
                    name="poolName"
                    value={userDetail?.poolName}
                    type="text"
                    onChange={handleChange1}
                    placeholder="Enter pool name"
                    className="input-create"
                    readOnly
                  />
                </div>
              </div>
              <div className="staking-token box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Staking Token Details</h5>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      // name="tokenBNB"
                      type="checkbox"
                      defaultChecked={userDetail?.isStakingTokenBnb}
                      class="custom-control-input"
                      disabled
                      // onChange={handleTokenCHeckbox}
                      id="customSwitch"
                    />
                    <label class="custom-control-label" for="customSwitch">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src="\assests\line.svg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Name</p>
                      <input
                        name="StakingTokenName"
                        value={userDetail?.stakingTokenName}
                        type="text"
                        placeholder="Staking Token name"
                        // onChange={handleChange1}
                        readOnly
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Staking Token Address</p>
                      <input
                        name="StakingTokenAddress"
                        value={userDetail?.stakingTokenAddress}
                        type="text"
                        placeholder="Staking Token Address"
                        // onChange={handleChange1}
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Symbol</p>
                      <input
                        name="StakingTokenSymbol"
                        value={userDetail?.stakingTokenSymbol}
                        type="text"
                        placeholder="Staking Token symbol"
                        readOnly
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="StakingTokenDecimals"
                        value={userDetail?.stakingDecimals}
                        type="text"
                        placeholder="Decimals"
                        readOnly
                        className="input-create"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Logo</p>
                      <div className="upload">
                        {/* <label htmlFor="after-upload">
                            <img
                              src=".\assests\upload-img.png"
                              alt="img"
                              className="img-fluid upload-img"
                            />
                        </label> */}
                        <label htmlFor="tokenLogo">
                          <img
                            src={token}
                            alt="img"
                            className="img-fluid upload-img"
                          />
                        </label>
                        <input
                          id="tokenLogo"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        />

                        {/* <input
                          id="after-upload"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        /> */}
                      </div>
                      <div className="text">
                        <p>
                          Logo Size: <span>38x38 px</span>
                        </p>
                        <p>
                          File Format: <span>PNG, SVG</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="saking-btn">
                  {isLive ? (
                    <button className="btn-yellow" onClick={pauseStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Pause Saking
                    </button>
                  ) : (
                    <button className="btn-yellow" onClick={pauseStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Resume Saking
                    </button>
                  )}
                </div>
              </div>
              <div className="reward-token box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Reward Token Details</h5>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="rewardBNB"
                      type="checkbox"
                      class="custom-control-input"
                      defaultChecked={userDetail?.isRewardTokenBnb}
                      disabled
                      // onChange={handleRewardCHeckbox}
                      id="customSwitch1"
                    />
                    <label class="custom-control-label" for="customSwitch1">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src="\assests\line.svg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Name</p>
                      <input
                        name="rewardTokenName"
                        value={userDetail?.rewardTokenName}
                        readOnly
                        type="text"
                        placeholder="Reward Token name"
                        // onChange={handleChange1}
                        className="input-create"
                        // readOnly={inputs.rewardBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Reward Token Address</p>
                      <input
                        name="rewardTokenAddress"
                        value={userDetail?.rewardTokenAddress}
                        type="text"
                        placeholder="Reward Token Address"
                        readOnly
                        className="input-create"
                        // readOnly={inputs.rewardBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Symbol</p>
                      <input
                        name="rewardTokenSymbol"
                        value={userDetail?.rewardTokenSymbol}
                        type="text"
                        placeholder="Reward Token symbol"
                        readOnly
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="rewardTokenDecimals"
                        value={userDetail?.rewardDecimals}
                        type="text"
                        placeholder="Decimals"
                        readOnly
                        className="input-create"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Logo</p>
                      <div className="upload">
                        {/* <label htmlFor="after-upload">
                       
                        </label> */}
                        {/* <label htmlFor="tokenLogo1">. */}
                        <img
                          src={token1}
                          alt="img"
                          className="img-fluid upload-img"
                        />
                        {/* </label> */}
                        <input
                          id="tokenLogo1"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        />
                        {/* <input
                          id="after-upload"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        /> */}
                      </div>
                      <div className="text">
                        <p>
                          Logo Size: <span>38x38 px</span>
                        </p>
                        <p>
                          File Format: <span>PNG, SVG</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="unsaking-btn">
                  {isLiveUnstake ? (
                    <button className="btn-yellow" onClick={pauseUnStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Pause UnStaking
                    </button>
                  ) : (
                    <button className="btn-yellow" onClick={pauseUnStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Resume UnStaking
                    </button>
                  )}
                </div>
              </div>
              <div className="other-detail box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Other Details</h5>
                  <img
                    src="\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  <div className="col-xl-7 col-12 padd-0">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div class="input-field">
                          <p>Lock Period</p>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            // onChange={handleChange2}
                            value={userDetail?.lockPeriod}
                          >
                            <option className="">
                              {userDetail?.lockPeriod}
                            </option>
                            <option value="1" className="inner-option">
                              One
                            </option>
                            <option value="2" className="inner-option">
                              Two
                            </option>
                            <option value="3" className="inner-option">
                              Three
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-0">
                        <div className="input-field apy">
                          <p>APY %</p>
                          <input
                            name="apy"
                            type="text"
                            placeholder="Reward Token symbol"
                            value={userDetail?.ApyPerscentage}
                            readOnly
                            // onChange={handleChange1}
                            className="input-create"
                          />
                          <img
                            src="\assests\percent.png"
                            alt="img"
                            className="img-fluid percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-field">
                      <p>Reward Wallet Address</p>
                      <input
                        name="rewardWalletAddress"
                        type="text"
                        value={userDetail?.rewardWalletAddress}
                        readOnly
                        placeholder="Reward Token symbol"
                        // onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Max Supply of Reward Pool</p>
                      <input
                        name="maxSupplyReward"
                        type="text"
                        placeholder="Reward Token symbol"
                        readOnly
                        value={userDetail?.maxSupplyOfRewadPool}
                        // onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="two-switch box-shadow">
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="autoCompound"
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch2"
                      defaultChecked={userDetail?.autoCompound}
                      disabled
                      // onChange={handleCompound}
                    />
                    <label class="custom-control-label" for="customSwitch2">
                      Auto Compound
                    </label>
                  </div>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="PreUnstaking"
                      type="checkbox"
                      class="custom-control-input"
                      defaultChecked={userDetail?.allowPrematureUnstaking}
                      id="customSwitch5"
                      disabled
                      // onChange={handlepremature}
                    />
                    <label class="custom-control-label" for="customSwitch5">
                      Allow Premature Unstaking
                    </label>
                  </div>
                  <div className="input-field">
                    {userDetail?.allowPrematureUnstaking == true ? (
                      <>
                        <p className="switch-para">
                          Fee for Premature Unstaking
                        </p>
                        <input
                          type="text"
                          placeholder="Fee"
                          name="feeUnstaking"
                          value={userDetail?.feeForPrematureUnstaking}
                          className="input-create"
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="btn-create">
                <button className="btn-yellow" onClick={CreatePool}>
                  Edit
                </button>
                <button className="btn-clear">Clear All</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;

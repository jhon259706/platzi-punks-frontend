import { useState } from "react";
import Web3 from "web3";

const Home = () => {
  const [ethereumButtonEnabled, setEthereumButtonEnabled] = useState(true);

  const enableEthereum = () => {
    if (window.ethereum) {
      setEthereumButtonEnabled(false);
      const web3 = new Web3(window.ethereum);

      web3.eth
        .requestAccounts()
        .then(console.log)
        .catch((error) => setEthereumButtonEnabled(true));
    }
  };

  return (
    <>
      <button disabled={!ethereumButtonEnabled} onClick={enableEthereum}>
        Hello World
      </button>
    </>
  );
};

export default Home;

import { useWeb3React } from "@web3-react/core";
import { useState, useCallback, useEffect } from "react";
import usePlatziPunks from "../hooks/usePlatziPunks";

const Home = () => {
  const { active } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState();
  const platziPunks = usePlatziPunks();

  const getMaxSupply = useCallback(async () => {
    if (platziPunks) {
      const result = await platziPunks.methods.maxSupply().call();
      console.log(result);
      setMaxSupply(result);
    }
  }, [platziPunks]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply])

  return (
    <>
      <p>
        { active ? `Max Supply: ${maxSupply}` : "Connect to your wallet" }
      </p>
    </>
  );
};

export default Home;

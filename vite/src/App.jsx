import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import Erc20Connect from "./components/Erc20Connect";
import { formatEther } from "ethers";

const App = () => {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balanceAddress, setBalanceAddress] = useState("");
  const [balance, setBalance] = useState();

  const onClickBalance = async () => {
    try {
      if (!balanceAddress) return;

      const response = await contract.balanceOf(balanceAddress);

      setBalance(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getNameSymbol = async () => {
    try {
      const nameResponse = await contract.name();
      const symbolResponse = await contract.symbol();

      setName(nameResponse);
      setSymbol(symbolResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getNameSymbol();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      <MetamaskButton signer={signer} setSigner={setSigner} />
      {signer && (
        <div className="mt-16 flex flex-col gap-8 grow max-w-xl w-full">
          <div className="box-style text-center">
            0x3521b39b39CE93cC3ef47c4636a8CC861C206782
          </div>
          <Erc20Connect name={name} signer={signer} setContract={setContract} />
          {name && (
            <div className="flex w-full items-start">
              <div className="flex flex-col gap-2 grow">
                <div className="ml-1 text-lg font-bold">
                  {name}
                  <span className="font-normal">({symbol})</span> 토큰 확인
                </div>
                {balance ? (
                  <div className="box-style">
                    {formatEther(balance)} {symbol}
                  </div>
                ) : (
                  <input
                    className="input-style"
                    type="text"
                    placeholder="지갑 주소"
                    value={balanceAddress}
                    onChange={(e) => setBalanceAddress(e.target.value)}
                  />
                )}
              </div>
              <button
                className="button-style ml-4 mt-9"
                onClick={onClickBalance}
              >
                확인
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

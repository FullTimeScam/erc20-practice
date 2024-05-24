import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import Erc20Connect from "./components/Erc20Connect";
import Balance from "./components/balance";
import { parseEther } from "ethers";

const App = () => {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState(null);
  const [transferAddress, setTransferAddress] = useState();
  const [transferAmount, setTransferAmount] = useState();

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

  const onClickTransfer = async () => {
    try {
      if (!transferAddress || !transferAmount) return;

      const response = await contract.transfer(
        transferAddress,
        parseEther(transferAmount, "wei")
      );

      console.log(response);
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
            0xa20dED068e956290c459ad3162d78B93a7109be3
          </div>
          <Erc20Connect name={name} signer={signer} setContract={setContract} />
          {name && (
            <Balance
              name={name}
              symbol={symbol}
              contract={contract}
              balance={balance}
              setBalance={setBalance}
            />
          )}
          {contract && (
            <div className="flex w-full">
              <input
                className="input-style grow"
                type="text"
                placeholder="지갑주소"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
              />
              <input
                className="input-style grow"
                type="text"
                placeholder="금액"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button className="button-style ml-4" onClick={onClickTransfer}>
                전송
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

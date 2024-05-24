import { useState } from "react";
import { parseEther } from "ethers";

const Transfer = ({ name, symbol, contract }) => {
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

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

  return (
    <div className="flex w-full items-end">
      <div className="flex flex-col gap-2 grow">
        <div className="ml-1 text-lg font-bold">
          {name}
          <span className="font-normal">({symbol})</span> 토큰 전송
        </div>
        <input
          className="input-style grow"
          type="text"
          placeholder="지갑 주소"
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
      </div>
      <button className="button-style ml-4 mt-9" onClick={onClickTransfer}>
        전송
      </button>
    </div>
  );
};

export default Transfer;

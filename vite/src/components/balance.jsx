import { formatEther } from "ethers";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";

const Balance = ({ name, symbol, contract, balance, setBalance }) => {
  const [balanceAddress, setBalanceAddress] = useState("");

  const onClickBalance = async () => {
    try {
      if (!balanceAddress) return;

      const response = await contract.balanceOf(balanceAddress);

      setBalance(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full items-start">
      <div className="flex flex-col gap-2 grow">
        <div className="ml-1 text-lg font-bold">
          {name}
          <span className="font-normal">({symbol})</span> 토큰 확인
        </div>
        {balance !== null ? (
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
      {balance !== null ? (
        <button
          className="button-style ml-4 mt-9"
          onClick={() => setBalance(null)}
        >
          <IoRefresh size={28} />
        </button>
      ) : (
        <button className="button-style ml-4 mt-9" onClick={onClickBalance}>
          확인
        </button>
      )}
    </div>
  );
};

export default Balance;

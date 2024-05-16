import { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';

const CheckAllowance = ({ tokenContractAddress, owner, spender }) => {
  const { isInitialized, Moralis } = useMoralis();
  const [allowance, setAllowance] = useState('Loading...');

  const { runContractFunction: getAllowance } = useWeb3Contract({
    abi: [{ "constant": true, "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}],
    contractAddress: tokenContractAddress,
    functionName: 'allowance',
    params: {
      _owner: owner,
      _spender: spender
    },
  });

  const fetchAllowance = async () => {
    if (!isInitialized) return;

    const result = await getAllowance({
      onSuccess: (allowance) => {
        setAllowance(Moralis.Units.FromWei(allowance.toString(), 18));
      },
      onError: (error) => {
        console.error('Error getting allowance:', error);
        setAllowance('Error');
      }
    });
  };

  return (
    <div>
      <button onClick={fetchAllowance}>Check Allowance</button>
      <p>Allowance: {allowance}</p>
    </div>
  );
};

export default CheckAllowance;
import React, { useEffect } from 'react';
import { DAO_ADDRESS, DAO_DEPLOYMENT_BLOCK, GLACIS_ROUTER_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

// REDUX
import { useDispatch } from 'react-redux';
import { fetchProposalData, setMessageIDs } from '../slices/proposalSlice';
import { setDAOInstances } from '../slices/daoSlice';

// WAGMI
import { bsc, bscTestnet, fantomTestnet, moonbaseAlpha } from 'wagmi/chains';
import { useContractReads, useAccount } from 'wagmi';
import { getPublicClient } from '@wagmi/core';
import { parseAbiItem } from 'viem';

const DataReader = () => {
  const dispatch = useDispatch();

  const { address } = useAccount();

  // The reason we use hooks is so that we can constantly poll for data.
  // This is the preliminary data that we read. If this data ever changes, then we would
  // want to requery a lot of other things.
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'nextProposal',
        chainId: fantomTestnet.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: fantomTestnet.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: moonbaseAlpha.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: bscTestnet.id
      },
    ],
    watch: true
  });

  // On Proposal # change
  useEffect(() => {
    const nextProposalQuery = data?.[0];
    dispatch(fetchProposalData(nextProposalQuery));
  }, [data?.[0]]);

  // On DAO Data Changed
  useEffect(() => {
    const daoDataQuery = [data?.[1], data?.[2], data?.[3]];
    const formattedData = [];

    let queryNum = 0;
    for (let query of daoDataQuery) {
      queryNum++;
      if (query?.status !== 'success') continue;
      const daoData = query.result;
      formattedData.push({
        address: DAO_ADDRESS,
        members: daoData[0]?.toString(),       // This turns the array into a toString guys!
        proposals: daoData[1]?.toString(),
        configText: daoData[2]?.toString(),
        configVersion: daoData[3]?.toString(),
        quorum: daoData[4]?.toString(),
        tokenAddress: daoData[5]?.toString(),
        tokenAmount: daoData[6]?.toString(),
        chainId: [fantomTestnet.id, moonbaseAlpha.id, bscTestnet.id][queryNum - 1],
        chainName: [fantomTestnet.name, moonbaseAlpha.name, bscTestnet.name][queryNum - 1]
      });
    }
    dispatch(setDAOInstances(formattedData));
  }, [data?.[1], data?.[2], data?.[3]]);

  // On Account Connection
  useEffect(() => {
    // Query for nonces
    const publicClient = getPublicClient({ chainId: fantomTestnet.chainId });
    publicClient.getLogs({
      address: GLACIS_ROUTER_ADDRESS,
      event: parseAbiItem('event GlacisAbstractRouter__MessageIdCreated(bytes32 indexed,address indexed,uint256)'),
      args: {
        //messageId: "0x0", // TODO: replace with queried ids
        sender: DAO_ADDRESS
      },
      fromBlock: DAO_DEPLOYMENT_BLOCK
    }).then(res => {
      console.log('message id query', res)
      let messageIDToNonce = {};
      for (let q of res) {
        if(!q.args || !q.args[0] || !q.args[2]) continue;
        messageIDToNonce[q.args[0]] = parseInt(q.args[2].toString())
      }
      dispatch(setMessageIDs(messageIDToNonce));
    })
  }, [address, data?.[0]]);

  return (<></>);
};

export default DataReader;

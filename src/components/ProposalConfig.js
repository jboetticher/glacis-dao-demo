import styled from 'styled-components';
import { BigCard, ButtonContainer, CardTitle, StyledButton } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, } from 'wagmi';
import { avalancheFuji, moonbaseAlpha } from 'wagmi/chains';
import GlacisSampleDAOABI from "../abi/GlacisSampleDAO.js";
import { useSelector } from 'react-redux';
import { selectDAOs } from '../slices/daoSlice';

const CHAIN_LIST = [avalancheFuji, moonbaseAlpha];

export default () => {
  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});

  const glacisOptions = ["Redundancy", "Retries"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole"];
  const chainOptions = ["Moonbase Alpha", "Avalanche"];

  const handleGlacisOptions = (selections) => { setGlacis(selections) };
  const handleGMPOptions = (selections) => { setGMPs(selections) };
  const handleChainChange = (selections) => { setChains(selections) };

  const daos = useSelector(selectDAOs);
  console.log('ProposalConfig DAOS', daos);

  // 7:48

  const args = [];
  for(let chainName in chains) {
    const chainInfo = CHAIN_LIST.filter(x => x.name.toLowerCase().includes(chainName.toLowerCase())).pop();
    const daoInfo = daos.filter(x => x.chainName.toLowerCase().includes(chainName.toLowerCase())).pop();
    
    console.log(chainInfo, daoInfo);

    if(chainInfo && daoInfo) {
      // Insert Proposal info here
      args.push([
        chainInfo.id,
        daoInfo.address,
        gmps.length,
        glacis.Retries !== undefined,
        "0x937cb06a"                  // selfConfig() selector
      ]);
    }
  }
  console.log(args);

  const { config } = usePrepareContractWrite({
    address: '0xbCF59D6928ec2454262675Ab116508CB3fE17757', // TODO: fetch from slice
    abi: GlacisSampleDAOABI,
    functionName: 'propose',
    args
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <BigCard>
      <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
      <ConfigContainer>
        <ConfigContainerTitle>Features</ConfigContainerTitle>
        <ConfigContainerTitle>GMPs</ConfigContainerTitle>
        <ConfigContainerTitle>Chains</ConfigContainerTitle>
      </ConfigContainer>
      <ConfigContainer>
        <Checklist options={glacisOptions} onChange={handleGlacisOptions} />
        {glacis?.Redundancy ?
          <Checklist options={gmpOptions} onChange={(x) => handleGMPOptions([x])} /> :
          <RadioGroup options={gmpOptions} name="gmps" onChange={handleGMPOptions} />
        }
        <Checklist options={chainOptions} onChange={handleChainChange} />
      </ConfigContainer>
      <ButtonContainer style={{ marginTop: '2rem' }}>
        <StyledButton>Submit Proposal on Fantom</StyledButton>
      </ButtonContainer>
    </BigCard>
  )
}

export const ConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const ConfigContainerTitle = styled.h3`
  width: 50%;
`;

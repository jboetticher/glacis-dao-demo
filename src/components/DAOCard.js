import React, { useState } from 'react';
import {
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  StyledButton
} from '../StyledComponents';
import Card from './container/Card';
import { Grid, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import "../styles/DAOCard.css";
import GlacisModal from './GlacisModal';

// Wagmi
import { usePrepareContractWrite, useContractWrite, useSwitchNetwork, useChainId } from 'wagmi';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';
import { DAO_ADDRESS } from '../constants';
import NumberInput from './NumberInput';

const DAOCard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Grid item sm={12}>
      <Card>
        <IconButton
          sx={{
            position: 'absolute', top: 8, right: 8, color: 'white', ":hover": {
              color: 'var(--text)'
            }
          }}
          onClick={handleOpen}
        >
          <SettingsIcon />
        </IconButton>
        <div className='daoCardTitleContainer'>
          <CardTitle style={{ textAlign: 'center', width: '100%', marginBottom: 0 }}>
            {props.chainName} DAO
          </CardTitle>
        </div>
        <div>
          <CardTable>
            <tbody>
              <CardRow>
                <CardCell>Members:</CardCell>
                <CardCell><CardCode>{props.members}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Config Text:</CardCell>
                <CardCell><CardCode>{props.configText}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Token Amount:</CardCell>
                <CardCell><CardCode>{props.tokenAmount}</CardCode></CardCell>
              </CardRow>
            </tbody>
          </CardTable>
          <CardTable>
            <tbody>
              <CardRow>
                <CardCell>Config Version:</CardCell>
                <CardCell><CardCode>{props.configVersion}</CardCode></CardCell>
                <CardCell>Quorum:</CardCell>
                <CardCell><CardCode>{props.quorum}</CardCode></CardCell>
              </CardRow>
            </tbody>
          </CardTable>
        </div>
      </Card>
      <GlacisModal open={openModal} handleClose={handleClose} title={props.chainName + ' DAO'}>
        <DAOModalContents {...props} />
      </GlacisModal>
    </Grid >
  );
};

function DAOModalContents(props) {

  const [localQuorum, setQuorum] = useState(1);
  const handleChange = (event) => { setQuorum(event.target.value) };

  // Create the write hook
  const chainId = useChainId();
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS,
    abi: GlacisSampleDAOABI,
    functionName: 'setQuorum',
    args: [localQuorum],
    chainId: props.chainId,
    enabled: true,
  });
  if (error) console.log('Error for propose, usePrepareContractWrite error:', error)
  const { isSuccess, write, error: writeErr } = useContractWrite(config);
  const { switchNetwork } = useSwitchNetwork();

  return <CardTable>
    <tbody>
      <CardRow>
        <CardCell>Address:</CardCell>
        <CardCell><CardCode>{props.address}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Members:</CardCell>
        <CardCell><CardCode>{props.members}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Config Text:</CardCell>
        <CardCell><CardCode>{props.configText}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Config Version:</CardCell>
        <CardCell><CardCode>{props.configVersion}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Quorum:</CardCell>
        <CardCell><CardCode>{props.quorum}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Token Amount:</CardCell>
        <CardCell><CardCode>{props.tokenAmount}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>Token Address:</CardCell>
        <CardCell><CardCode>{props.tokenAddress}</CardCode></CardCell>
      </CardRow>
      <CardRow>
        <CardCell>
          <StyledButton onClick={chainId === props.chainId ? write : () => switchNetwork(props.chainId)}>
            {chainId === props.chainId ? 'Set Quorum' : 'Switch Network'}
          </StyledButton>
        </CardCell>
        <CardCell>
          <NumberInput value={localQuorum} onChange={handleChange} />
        </CardCell>
      </CardRow>
    </tbody>
  </CardTable>;
}

export default DAOCard;



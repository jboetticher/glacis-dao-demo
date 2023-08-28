import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
  background-color: var(--green);
  text-shadow: 2px 2px 0 var(--orange);
  padding: 1rem;
  font-family: 'Space Mono', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
`;

export const ConnectButton = styled.button`
  position: absolute;
  right: 3rem; 
  top: 50%; 
  transform: translateY(-50%); 
  
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: var(--orange);
  }
`;

export const ProposalList = styled.div`
  width: 48%;
  overflow: auto;
`;

export const BigCardContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BigCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  margin-bottom: 1em;
  padding: 1em;
  color: white; /* set text color */
`;

export const ProposalCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1em;
  padding: 1em;
  color: white; /* set text color */
`;

export const CardTitle = styled.div`
  font-family: 'Space Mono', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 0 var(--orange);
  font-size: 24px;
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
`;

export const StyledButton = styled.button`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: var(--orange);
  }

  &:disabled {
    background: #ddd; /* you can adjust this color */
    border: 2px solid #aaa; /* adjust as needed */
    color: #aaa; /* adjust as needed */
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: #ddd;
    color: #aaa;
    border: 2px solid #aaa; /* ensures the hover effect doesn't trigger when the button is disabled */
  }
`;

export const CardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.h4`
  text-align: center;
  border-bottom: 1px solid var(--orange);
  border-top: 1px solid var(--orange);
  margin: 1rem 2rem 1rem 2rem; 
  color: white;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export const CardRow = styled.tr``;

export const CardCell = styled.td`
  padding: 8px;
  font-weight: normal;
  color: white;
  overflow-wrap: break-word;
`;

export const CardCode = styled.code`
  font-family: 'Space Mono', monospace; // or your preferred code font
  background-color: rgba(255, 255, 255, 0.1); // or any background you prefer
  padding: 4px;
  border-radius: 4px;
  display: inline-block;
  overflow-wrap: anywhere;
`;

export const ExpandableSection = styled.div`
  max-height: ${props => (props.opened ? '500px' : '0')}; // You can adjust the max-height according to your content
  opacity: ${props => (props.opened ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
`;

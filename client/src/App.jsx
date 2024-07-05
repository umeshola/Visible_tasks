import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import abi from './Contract/Todo.json';
import Navbar from './Components/Navbar';
import Data from './Components/Data';
function App() {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
        account: null,
    });

    const connectWallet = async () => {
        const contractAddress = "0x49461D2B6f9EEb8179e125c3d5F731E40fb8D55c";
        const contractABI = abi.abi;
        try {
            const { ethereum } = window;
            if (ethereum) {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                console.log(accounts)
                if (accounts.length > 0) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum); // Using Web3Provider // first make a react app-> npm install --save ether@5.7.2 then do as you like
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, contractABI, signer);
                    setState({ provider, signer, contract, account: accounts[0] });
                } else {
                    setState(prevState => ({ ...prevState, account: null }));
                }
            } else {
                console.log("Ethereum object not found, install Metamask.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        connectWallet();

        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                setState(prevState => ({ ...prevState, account: accounts[0] }));
            } else {
                setState(prevState => ({ ...prevState, account: null }));
                console.log("Please connect to MetaMask.");
            }
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        const checkAccounts = async () => {
            const { ethereum } = window;
            if (ethereum) {
                const accounts = await ethereum.request({ method: "eth_accounts" });
                if (accounts.length === 0) {
                    setState(prevState => ({ ...prevState, account: null }));
                }
            }
        };

        const interval = setInterval(checkAccounts, 1000);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Navbar state={state} />
            <Data state={state} />
        </div>
    );
}

export default App;
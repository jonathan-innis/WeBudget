import { faCaretDown, faCaretUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import "./Account.scss";
import Modal from "./Modal";

let accountData = {
    "accounts" : [
        {
            "name": "Budget",
            "isHidden": false,
            "items": [
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "USAA Checking",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "BECU Checking",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "USAA Savings",
                    "accountValue": 1000
                }
            ]
        },
        {
            "name": "Tracking",
            "isHidden": false,
            "items": [
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                }
            ]
        },
        {
            "name": "Closed",
            "isHidden": false,
            "items": [
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "Vanguard Brokerage",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "Vanguard Roth IRA",
                    "accountValue": 1000
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "Fidelity 401K",
                    "accountValue": 1000
                }
            ]
        }
    ]
}

const mockUpdateHidden = (accountName, newState) => {
    for (let account of accountData.accounts) {
        if (account.name == accountName) {
            account.isHidden = newState;
            console.log(accountData);
        }
    }
}

export default function AccountBar() {    
    const [isOpenModal, setOpenModal] = useState();


    return (
        <>
            <table>
                {
                    accountData.accounts.map((account, index) => 
                        <AccountDropDown key={index} name={account.name} items={account.items} isHidden={account.isHidden}/>
                    )
                }
            </table>
            <button onClick={() => setOpenModal(true)}>Add Account</button>
            <Modal 
                isOpen={isOpenModal}
                maxWidth={'400px'}
            >
                <FontAwesomeIcon className="modal-closer" icon={faTimes} size='lg' onClick={() => setOpenModal(false)}/>
                <h2>Add Account</h2>
                <hr></hr>
                <AccountCreationFlow/>
            </Modal>
        </>
    )
}

function AccountDropDown(props) {
    const [isHidden, setHidden] = useState(false);
    let accountSum = props.items.reduce((total, account) => total + account.accountValue, 0);

    const updateHidden = (newState) => {
        setHidden(newState);
        mockUpdateHidden(props.name, newState);
    }

    return (
        <>
            <tr className="account-sidebar-header">
                <th>
                { isHidden ? 
                    <FontAwesomeIcon icon={faCaretDown} className="caret" size="lg" onClick={() => updateHidden(false)}/> :
                    <FontAwesomeIcon icon={faCaretUp} className="caret" size="lg" onClick={() => updateHidden(true)}/>
                }
                </th>
                <th>{props.name}</th>
                <th>$ {parseFloat(accountSum).toFixed(2)}</th>
            </tr>
            { isHidden ? null :
                <>
                {props.items.map((account) => 
                    <tr key={account._id}>
                        <td></td>
                        <td>{account.name}</td>
                        <td>$ {parseFloat(account.accountValue).toFixed(2)}</td>
                    </tr>
                )}
                </>
            }
        </>
    )
}

function AccountCreationFlow(props) {
    const [pageNum, setPage] = useState(0);

    if (pageNum == 0) {
        return (
            <div>
                <p style={{marginBottom: '30px'}}>Let's go! And don't worry--if you change your mind, you can link your account at any time.</p>
                <form>
                    <label for="cars">Choose a car:</label>
                    <select id="cars" name="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input></input>
                    <input></input>
                </form>
            </div>
        )
    } else if (pageNum == 1) {
        return (
            <div></div>
        )
    }
}
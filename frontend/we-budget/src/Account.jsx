import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import "./Account.scss";

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
    console.log(accountData)
    return (
        <>
            <table>
                {
                    accountData.accounts.map((account, index) => 
                        <AccountDropDown key={index} name={account.name} items={account.items} isHidden={account.isHidden}/>
                    )
                }
            </table>
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
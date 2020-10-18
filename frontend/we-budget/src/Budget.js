import React, { useState, useRef, useEffect } from "react";
import './App.css';
import { withRouter } from "react-router";

const budgetData = {
    "_id": "5f82486f4f642b1de56daa12",
    "name": "Budget1",
    "categories": [
        {
            "_id": "5f8248d14f642b1de56daa17",
            "name": "Category1",
            "lineItems": [
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                },
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                }
            ]
        },
        {
            "_id": "5f8248d14f642b1de56daa18",
            "name": "Category2",
            "lineItems": [
                {
                    "_id": "5f8248d14f642b1de56daa18",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                }
            ]
        }
    ],
    "meta": {
        "timeCreated": "2020-10-10T23:49:03.168Z",
        "timesAccessed": 2,
        "timesUpdated": 3
    }
}

function Budget() {
    // const budgetId = this.props.match.params.budgetId;
    const [myBudget, setMyBudget] = useState(budgetData);
    const updateLineItem = (i, j, dataType, value) => {
        if (!value) value = "";
        let newBudget = Object.assign({}, myBudget)

        if (dataType == "amountBudgeted") {
            if (value == "") value = 0;
            value = parseInt(value);
        }
        newBudget.categories[i].lineItems[j][dataType] = value
        setMyBudget(newBudget);
    }
    return (
        <table className="budget-table">
            <tr>
                <th>Category Name</th>
                <th>Amount Budgeted</th>
                <th>Amount Spent</th>
                <th>Amount Remaining</th>
            </tr>
            {myBudget.categories.map((category, categoryIndex) => 
                <React.Fragment key={category._id}>
                    <tr>
                        <th>{category.name}</th>
                        <th>{category.lineItems.reduce((a, b) => a + (b["amountBudgeted"] || 0), 0)}</th>
                        <th>{category.lineItems.reduce((a, b) => a + (b["amountSpent"] || 0), 0)}</th>
                        <th>{category.lineItems.reduce((a, b) => a + (b["amountBudgeted"] - b["amountSpent"]) || 0, 0)}</th>
                    </tr>
                    {category.lineItems.map((lineItem, lineItemIndex) => 
                        <tr key={lineItem._id}>
                            <td><EditableInput value={lineItem.name} categoryIndex={categoryIndex} lineItemIndex={lineItemIndex} dataType={"name"} setData={updateLineItem}/></td>
                            <td><EditableInput value={lineItem.amountBudgeted} categoryIndex={categoryIndex} lineItemIndex={lineItemIndex} dataType={"amountBudgeted"} setData={updateLineItem}/></td>
                            <td>{lineItem.amountSpent}</td>
                            <td>{lineItem.amountBudgeted - lineItem.amountSpent}</td>
                        </tr>
                    )}
                </React.Fragment>
            )}
        </table>
    )
}

function EditableInput(props) {
    const [editMode, setEditMode] = useState(false);
    const node = useRef();
    const inputRef = useRef();

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleKeyDown = (event) => {
        if (event.key == "Enter") setEditMode(false);
    }

    const handleClick = (event) => {
        if (node.current.contains(event.target)) return;
        setEditMode(false);
    }

    useEffect(() => {
        if (editMode) {
            inputRef.current.focus();
        }
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [editMode])

    const renderEditView = () => {
        return <div>
            <input
                ref={inputRef}
                type="text"
                value={props.value}
                onChange={(e) => props.setData(props.categoryIndex, props.lineItemIndex, props.dataType, e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
            />
        </div>
    }

    const renderDefaultView = () => {
        return <div onDoubleClick={() => setEditMode(true)}>
            {props.value}
        </div>
    }
    return <div ref={node}>{editMode ? renderEditView() : renderDefaultView()}</div>
}

export default withRouter(Budget);
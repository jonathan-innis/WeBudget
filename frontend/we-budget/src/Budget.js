import React, { useState, useRef, useEffect } from "react";
import './Budget.scss';
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
    const [activeIndex, setActiveIndex] = useState(0);
    
    const updateLineItem = (i, j, dataType, value) => {
        if (!value) value = "";
        let newBudget = Object.assign({}, myBudget)

        console.log(value)

        if (dataType == "amountBudgeted") {
            if (value == "") value = 0;
            value = parseFloat(value).toFixed(2);
        }

        console.log(value)
        newBudget.categories[i].lineItems[j][dataType] = value
        setMyBudget(newBudget);
    }

    return (
        <table className="budget-table">
            <tr className="budget-header-wrapper">
                <th className="title-header">CATEGORY</th>
                <th className="title-header align-right custom-input-header">BUDGETED</th>
                <th className="title-header align-right">ACTIVITY</th>
                <th className="title-header align-right">AVAILABLE</th>
            </tr>
            {myBudget.categories.map((category, categoryIndex) => 
                <Category data={category} index={categoryIndex} updateLineItem={updateLineItem}/>
            )}
        </table>
    )
}

function Category(props) {
    const data = props.data;
    const index = props.index;
    const updateLineItem = props.updateLineItem;

    console.log(data);

    return(
        <React.Fragment key={data._id}>
            <tr className="budget-header-wrapper budget-category-header-wrapper">
                <th>{data.name}</th>
                <th className="align-right custom-input-header">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountBudgeted"] || 0), 0)).toFixed(2)}</th>
                <th className="align-right">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountSpent"] || 0), 0)).toFixed(2)}</th>
                <th className="align-right">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountBudgeted"] - b["amountSpent"]) || 0, 0)).toFixed(2)}</th>
            </tr>
            {data.lineItems.map((lineItem, lineItemIndex) => 
                <tr key={lineItem._id}>
                <td className="budget-align-left">{lineItem.name}</td>
                <td className="align-right"><EditableInput value={lineItem.amountBudgeted} categoryIndex={index} lineItemIndex={lineItemIndex} dataType={"amountBudgeted"} setData={updateLineItem} isActive={true}/></td>
                <td className="align-right">$ {parseFloat(lineItem.amountSpent).toFixed(2)}</td>
                <td className="align-right budget-diff-wrapper">{ lineItem.amountBudgeted - lineItem.amountSpent > 0 ?  
                    <p className="budget-amount budget-amount-positive">$ {parseFloat(lineItem.amountBudgeted - lineItem.amountSpent).toFixed(2)}</p>
                    : lineItem.amountBudgeted - lineItem.amountSpent < 0 ? 
                    <p className="budget-amount budget-amount-negative">$ {parseFloat(lineItem.amountBudgeted - lineItem.amountSpent).toFixed(2)}</p>
                    :
                    <p className="budget-amount budget-amount-neutral">$ {parseFloat(lineItem.amountBudgeted - lineItem.amountSpent).toFixed(2)}</p>
                }
                </td>
            </tr>
            )}
        </React.Fragment>
    )
}

function EditableInput(props) {
    const [editMode, setEditMode] = useState(false);
    const node = useRef();
    const inputRef = useRef();

    const handleFocus = (event) => {
        setEditMode(true);
        console.log(editMode);
        event.target.select();
    }

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            inputRef.current.blur();
            props.setData(props.categoryIndex, props.lineItemIndex, props.dataType, event.target.value)

            if (event.target.value && event.target.value === "") event.target.value = 0;
            event.target.value = parseFloat(event.target.value).toFixed(2);
            setEditMode(false);
        }
    }

    const handleClick = (event) => {
        if (node.current.contains(event.target)) return;
        if (editMode) {
            inputRef.current.blur();
            props.setData(props.categoryIndex, props.lineItemIndex, props.dataType, inputRef.current.value);

            if (inputRef.current.value === "") inputRef.current.value = 0;
            inputRef.current.value = parseFloat(inputRef.current.value).toFixed(2)

            setEditMode(false);
        }
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
        return <div>$&nbsp;
            <input
                className="budget-custom-input"
                ref={inputRef}
                type="text"
                defaultValue={parseFloat(props.value).toFixed(2)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
            />
        </div>
    }
    return <div ref={node}>{renderEditView()}</div>
}

export default withRouter(Budget);
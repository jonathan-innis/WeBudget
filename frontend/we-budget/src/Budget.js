import React, { useState, useRef, useEffect } from "react";
import './Budget.scss';
import { withRouter } from "react-router";
import {Tooltip, EditLineItemInnerTooltip, AddCategoryInnerTooltip} from "./Tooltip";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'


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
                    "amountBudgeted": 200.00,
                    "amountSpent": 200
                },
                {
                    "_id": "5f8248d14f642b1de56daa19",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                },
                {
                    "_id": "5f8248d14f642b1de56daa20",
                    "name": "LineItem1",
                    "amountBudgeted": 100.00,
                    "amountSpent": 200
                }
            ]
        },
        {
            "_id": "5f8248d14f642b1de56dab18",
            "name": "Category2",
            "lineItems": [
                {
                    "_id": "5f8248d14f642b1de56daa21",
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

async function mockAddCatetgory(data) {
    data.categories.unshift(
        {
            "_id": "5f8248d14f642b1de56daa20",
            "name": "Category2",
            "lineItems": []
        }
    )
    return Object.assign({}, data)
}

async function mockAddLineItem(data, categoryIndex) {
    data.categories[categoryIndex].lineItems.unshift(
        {
            "_id": "5f8248d14f642b1de56daa22",
            "name": "DifferentLineItem",
            "amountBudgeted": 0.00,
            "amountSpent": 0
        }
    )
    return Object.assign({}, data)
}

function Budget() {
    // const budgetId = this.props.match.params.budgetId;
    const [myBudget, setMyBudget] = useState(budgetData);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const updateLineItem = (i, j, dataType, value) => {
        if (!value) value = "";
        let newBudget = Object.assign({}, myBudget)

        if (dataType == "amountBudgeted") {
            if (value == "") value = 0;
            value = parseFloat(value).toFixed(2);
        }

        newBudget.categories[i].lineItems[j][dataType] = parseFloat(value)
        setMyBudget(newBudget);
    }

    async function insertRow() {
        let newBudget = await mockAddCatetgory(myBudget);
        setMyBudget(newBudget);
    }

    async function insertLineItem(categoryIndex) {
        let newBudget = await mockAddLineItem(myBudget, categoryIndex);
        setMyBudget(newBudget)
    }

    return (
        <table className="budget-table">
            <TopBar insertRow={insertRow}/>
            <tr className="budget-header-wrapper">
                <th className="title-header">CATEGORY</th>
                <th className="title-header align-right custom-input-header">BUDGETED</th>
                <th className="title-header align-right">ACTIVITY</th>
                <th className="title-header align-right">AVAILABLE</th>
            </tr>
            {myBudget.categories.map((category, categoryIndex) => 
                <Category data={category} index={categoryIndex} updateLineItem={updateLineItem} insertLineItem={insertLineItem}/>
            )}
        </table>
    )
}

function TopBar(props) {
    return(
        <tr className="top-bar-wrapper">
            <td>
                <Tooltip content={<AddCategoryInnerTooltip name={"here"}/>}>
                    <div className="add-category-wrapper">
                        <FontAwesomeIcon icon={faPlusCircle} className="plus-icon"/>
                        <p>Category Group</p>
                    </div>
                </Tooltip>
            </td>
        </tr>
    );
}

function Category(props) {
    const data = props.data;
    const index = props.index;
    const updateLineItem = props.updateLineItem;

    return(
        <React.Fragment key={data._id}>
            <tr className="budget-header-wrapper budget-category-header-wrapper">
                <th className="line-item-name-wrapper">
                    <Tooltip content={<EditLineItemInnerTooltip name={data.name}/>}>
                        <p className="tooltip-name-opener">{data.name}</p>
                    </Tooltip>
                    <FontAwesomeIcon className="plus-icon" icon={faPlusCircle} onClick={() => props.insertLineItem(props.index)}/>
                </th>
                <th className="align-right custom-input-header">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountBudgeted"] || 0), 0)).toFixed(2)}</th>
                <th className="align-right">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountSpent"] || 0), 0)).toFixed(2)}</th>
                <th className="align-right">$ {parseFloat(data.lineItems.reduce((a, b) => a + (b["amountBudgeted"] - b["amountSpent"]) || 0, 0)).toFixed(2)}</th>
            </tr>
            {data.lineItems.map((lineItem, lineItemIndex) => 
                <tr key={lineItem._id}>
                <td className="budget-align-left">
                    <Tooltip content={<EditLineItemInnerTooltip name={lineItem.name}/>}>
                        <p className="tooltip-name-opener">{lineItem.name}</p>
                    </Tooltip>
                </td>
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
            console.log(event.target.value)
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
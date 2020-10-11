import React from "react";
import './App.css';
import { withRouter } from "react-router";

class Budget extends React.Component {
    constructor(props){
        super(props);
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
        this.state = {budgetData: budgetData}
    }

    componentDidMount() {
        const budgetId = this.props.match.params.budgetId;
    }
    render() {
        return (
            <table>
                <tr>
                    <th>Category Name</th>
                    <th>Amount Budgeted</th>
                    <th>Amount Spent</th>
                </tr>
                {this.state.budgetData.categories.map((category) => 
                    <>
                        <tr key={category._id}>
                            <th>{category.name}</th>
                            <th>{category.lineItems.reduce((a, b) => a + (b["amountBudgeted"] || 0), 0)}</th>
                            <th>{category.lineItems.reduce((a, b) => a + (b["amountSpent"] || 0), 0)}</th>
                        </tr>
                        {category.lineItems.map((lineItem) => 
                            <tr key={lineItem._id}>
                                <td>{lineItem.name}</td>
                                <td>{lineItem.amountBudgeted}</td>
                                <td>{lineItem.amountSpent}</td>
                            </tr>
                        )}
                    </>
                )}
            </table>
        )
    }
}

export default withRouter(Budget);
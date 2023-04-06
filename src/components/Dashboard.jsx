import Bets from './Bets';
import React, { Component } from 'react'

class Dashboard extends Component {
    render() { 
        return (
            <div>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Profit</th>
                            <th scope="col">Win</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
 
export default Dashboard
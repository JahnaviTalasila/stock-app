import React, { Component } from "react";

class Trades extends Component {
  render() {
    const parseTimestamp = (timestamp) =>
      timestamp.toLocaleTimeString([], {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    let tradeList = this.props.trades
      ? this.props.trades.map((trade, index) => (
          <tr key={index}>
            <td>{parseTimestamp(trade.timestamp)}</td>
            <td>{trade.stockSymbol}</td>
            <td>{trade.action}</td>
            <td>{trade.quantity}</td>
            <td>{trade.price}</td>
            <td>{trade.price * trade.quantity}</td>
          </tr>
        ))
      : null;
    return (
      <table className="table app-table rightAlign">
        <thead>
          <tr>
            <th>Trade Date</th>
            <th>Stock Symbol</th>
            <th>Action</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {tradeList.length !== 0 ? (
            tradeList
          ) : (
            <tr>
              <td colSpan="6">There are no records to show</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Trades;

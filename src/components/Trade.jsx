import React, { Component } from "react";
import { stockSymbols } from "../models/Stock";
import { actionTypes } from "../models/Trade";

class Trade extends Component {
  render() {
    return (
      <div>
        <table className="table app-table leftAlign">
          <tbody>
            <tr>
              <td>Stock Symbol *</td>
              <td>
                <select
                  className="selectDD"
                  name="stockSymbol"
                  value={this.props.newTrade.stockSymbol}
                  onChange={(event) => this.props.onChange(event)}
                  onBlur={(event) => this.props.onChange(event)}
                >
                  <option></option>
                  <option>{stockSymbols.TEA}</option>
                  <option>{stockSymbols.POP}</option>
                  <option>{stockSymbols.ALE}</option>
                  <option>{stockSymbols.GIN}</option>
                  <option>{stockSymbols.JOE}</option>
                </select>
                <span style={{ color: "red" }}>
                  {this.props.errors["stockSymbol"]}
                </span>
              </td>
            </tr>
            <tr>
              <td>Quantity *</td>
              <td>
                <input
                  name="quantity"
                  type="number"
                  value={this.props.newTrade.quantity}
                  onChange={(event) => this.props.onChange(event)}
                  onBlur={(event) => this.props.onChange(event)}
                />
                <span style={{ color: "red" }}>
                  {this.props.errors["quantity"]}
                </span>
              </td>
            </tr>
            <tr>
              <td>Action *</td>
              <td>
                <input
                  name="action"
                  type="radio"
                  value={actionTypes.BUY}
                  checked={this.props.newTrade.action === actionTypes.BUY}
                  onChange={(event) => this.props.onChange(event)}
                  onBlur={(event) => this.props.onChange(event)}
                />
                <span className="radioSpan">Buy</span>
                <input
                  name="action"
                  type="radio"
                  value={actionTypes.SELL}
                  checked={this.props.newTrade.action === actionTypes.SELL}
                  onChange={(event) => this.props.onChange(event)}
                  onBlur={(event) => this.props.onChange(event)}
                />
                <span className="radioSpan">Sell</span>
                <br />
                <span style={{ color: "red" }}>
                  {this.props.errors["action"]}
                </span>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button
                  className="app-button"
                  onClick={(event) => this.props.onClick(event)}
                >
                  Trade
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Trade;

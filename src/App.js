import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar";
import Stocks from "./components/Stocks";
import Trades from "./components/Trades";
import NewTrade from "./components/Trade";
import { Stock, stockSymbols, stockTypes } from "./models/Stock";
import { Trade } from "./models/Trade";
import "./App.css";

class App extends Component {
  state = {
    stocks: null,
    geometricMean: null,
    trades: [],
    errors: {},
    newTrade: {
      stockSymbol: "",
      quantity: "",
      action: "",
    },
  };

  componentDidMount() {
    this.setState({ stocks: this.initStocks() });
  }

  render() {
    return (
      <div className="app">
        <main className="container app-container">
          <NavigationBar title={"Super Simple Stock Market - Stocks"} />
          <Stocks
            stocks={this.state.stocks}
            onPriceChange={(event, index) =>
              this.priceChangeHandler(event, index)
            }
            geometricMean={this.state.geometricMean}
          />
          <NavigationBar title={"Super Simple Stock Market - Trades"} />
          <NewTrade
            newTrade={this.state.newTrade}
            errors={this.state.errors}
            onChange={(event) => this.inputChangeHandler(event)}
            onClick={(event) => this.createTradeHandler(event)}
          />
          <Trades trades={this.state.trades} />
        </main>
      </div>
    );
  }

  initStocks = () => {
    return [
      new Stock(stockSymbols.TEA, stockTypes.common, 0, null, 100),
      new Stock(stockSymbols.POP, stockTypes.common, 8, null, 100),
      new Stock(stockSymbols.ALE, stockTypes.common, 23, null, 60),
      new Stock(stockSymbols.GIN, stockTypes.preferred, 8, 2, 100),
      new Stock(stockSymbols.JOE, stockTypes.common, 13, null, 250),
    ];
  };

  priceChangeHandler = (event, index) => {
    const newPriceValue = event.target.value;
    const oldStock = this.state.stocks[index];
    const updatedStock = new Stock(
      oldStock.symbol,
      oldStock.type,
      oldStock.lastDividend,
      oldStock.fixedDividend,
      oldStock.parValue,
      parseFloat(newPriceValue),
      oldStock.VWSPrice
    );
    const newStocks = [...this.state.stocks];
    newStocks[index] = updatedStock;
    this.setState({ stocks: newStocks });
  };

  inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newTrade = { ...this.state.newTrade, [name]: value };
    this.setState({
      newTrade: newTrade,
    });
    this.validateTradeForm();
  };

  validateTradeForm = () => {
    let errors = {};
    const newTrade = { ...this.state.newTrade };
    if (!newTrade.stockSymbol)
      errors["stockSymbol"] = "Stock Symbol is mandatory";
    if (!newTrade.quantity) errors["quantity"] = "Quantity is mandatory";
    if (!newTrade.action) errors["action"] = "Action is mandatory";
    this.setState({
      errors: errors,
    });
  };

  createTradeHandler = () => {
    if (this.isNewTrade()) {
      const stock = this.state.stocks.filter(
        (stock) => stock.symbol === this.state.newTrade.stockSymbol
      )[0];
      if (stock.price > 0) {
        const trade = new Trade(
          stock.symbol,
          this.state.newTrade.quantity,
          this.state.newTrade.action,
          stock.price
        );
        this.updateStockVWSPrice(stock, trade);
        this.setState((prevState) => ({
          trades: prevState.trades.concat(trade),
        }));
      } else {
        console.error("Missing price of selected stock");
        alert("Please enter price of a selected stock first and continue");
      }
    } else {
      console.error("New trade form is not complete");
      //alert("Please enter mandatory fields");
    }
  };

  isNewTrade = () => {
    const newTrade = this.state.newTrade;
    this.validateTradeForm();
    return newTrade.quantity && newTrade.action && newTrade.stockSymbol;
  };

  updateStockVWSPrice = (stock, trade) => {
    const updatedStock = new Stock(
      stock.symbol,
      stock.type,
      stock.lastDividend,
      stock.fixedDividend,
      stock.parValue,
      stock.price
    );
    const trades = this.getStockTrades(
      this.state.trades.concat(trade),
      stock.symbol
    );
    updatedStock.calcVWSPrice(trades);
    const newStocks = [...this.state.stocks];
    newStocks[newStocks.indexOf(stock)] = updatedStock;
    const newGeometricMean = this.calcGeometricMean(newStocks);
    this.setState({ stocks: newStocks, geometricMean: newGeometricMean });
  };

  calcGeometricMean = (stocks) => {
    let stocksVWSPrice = null;
    let stockAmount = 0;

    if (stocks && stocks.length > 0) {
      for (let x = 0; x < stocks.length; x++) {
        if (stocks[x].VWSPrice) {
          stocksVWSPrice = stocksVWSPrice
            ? (stocksVWSPrice *= stocks[x].VWSPrice)
            : stocks[x].VWSPrice;
          stockAmount++;
        }
      }
    }
    return stockAmount > 0 ? Math.pow(stocksVWSPrice, 1 / stockAmount) : null;
  };

  getStockTrades = (trades, stockSymbol) => {
    return trades.filter(
      (trade) =>
        trade.stockSymbol === stockSymbol &&
        this.getDiffInMinutes(trade.timestamp, new Date()) <= 15
    );
  };

  getDiffInMinutes = (date1, date2) => {
    const diff = (date1.getTime() - date2.getTime()) / 60000;
    return Math.abs(Math.round(diff));
  };
}

export default App;

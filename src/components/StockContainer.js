import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, handleClick }) {

  const renderStocks = stocks.map((stock) => {
   
    return <Stock stock={stock} key={stock.id} handleClick={handleClick}/>
  })


  return (
    <div>
      <h2>Stocks</h2>
      {renderStocks}
    </div>
  );
}

export default StockContainer;

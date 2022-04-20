import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const BASE_URL = "http://localhost:3001/stocks"

function MainContainer() {
  const [stockList, setStockList] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    fetch(BASE_URL)
    .then((resp) => resp.json())
    .then(stocks => setStockList(stocks))
  }, [])

  useEffect(() => {
    console.log('sort something')
    if(sortBy === 'Alphabetically'){
      const sortedStocks= sortByName()
      setStockList(sortedStocks)
    } else {
      const sortStocksByPrice = sortByPrice()
      setStockList(sortStocksByPrice)
    }
  }, [ sortBy ])


  useEffect(() => {
   
  }, [filterBy])


  // function filterByCategory(stock){

  // }

  function buyStock(stock){
    if(!myStocks.includes(stock)){
      const updateMyStocks = [...myStocks, stock]
      setMyStocks(updateMyStocks)
    }
  }

  function sellStock(stock){
    const updateMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updateMyStocks)
  }

  function sortStocks(e){
    setSortBy(e.target.value)
  }


  function sortByName(){
    return [...stockList].sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  function sortByPrice(){
    return [...stockList].sort(function (a, b) {
      return a.price - b.price;
    });
  }



  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stockList} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

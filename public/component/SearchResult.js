import React from 'react';

const SearchResultPanel = ({results, currencyFormatRegx}) => {
  let totalPrice = 0;
  if(results){
    //format the price as currency
    totalPrice = results.totalPrice.toFixed(2).replace(currencyFormatRegx, '$1,');
  }
  const tableContent = (results && results.flights.length) ?
    results.flights.map(((res, index)=>
      <tr key={index} className="flightsInfo">
        <td>{res.begin}</td>
        <td>{res.end}</td>
        <td>{res.stopNum}</td>
        <td>{res.stops.join(', ')}</td>
        <td>{res.shuttles}</td>
        <td>{res.sectionDistance} KM</td>
        <td>{res.duration} 小时</td>
      </tr>
    )): null;

    const purchaseContent = results ?
      <tr id="search-purchaseContent"><td colSpan="7">
        <img src="../resource/icon/cart.png"/>
        总价 CNY {totalPrice}
        <button className="general-submit-btn">购买</button>
      </td></tr> : null

  return(
    <div id="searchResult">
        <table border="0">
        <thead>
            <tr>
              <th>出发地</th>
              <th>目的地</th>
              <th>经站数</th>
              <th>停靠星球</th>
              <th>乘坐飞船</th>
              <th>距离</th>
              <th>历时</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
            {purchaseContent}
          </tbody>
        </table>
    </div>
  );
}

export default SearchResultPanel;

import React from 'react';

const SearchResultPanel = ({results}) => {
  let totalPrice = 0;
  if(results){
    totalPrice = results.totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  const tableContent = (results && results.flights.length) ?
    results.flights.map(((res, index)=>
      <tr key={index} className="flightsInfo">
        <td>{res.begin}</td>
        <td>{res.end}</td>
        <td>{res.stopNum}</td>
        <td>{res.stops.join(', ')}</td>
        <td>{res.shuttles}</td>
        <td>{res.duration}</td>
      </tr>
    )): null;

    const purchaseContent = results ?
      <tr id="purchaseContent"><td colSpan="7">
        总价格 CNY {totalPrice}
        <a href="#"> 买票</a>
      </td></tr> : null

  return(
    <div id="searchResult">
        <table border="0">
        <thead>
            <tr>
              <th>起点</th>
              <th>终点</th>
              <th>停站数</th>
              <th>停靠站</th>
              <th>飞船</th>
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

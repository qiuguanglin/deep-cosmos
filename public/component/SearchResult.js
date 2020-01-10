import React from 'react';
import {FormattedMessage} from 'react-intl';

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
        <td>{res.duration} <FormattedMessage id="search-result-hour"/></td>
      </tr>
    )): null;

    const purchaseContent = results ?
      <tr id="search-purchaseContent"><td colSpan="7">
        <img src="../resource/icon/cart.png"/>
        <FormattedMessage id="search-purchase-price"/> <strong>{totalPrice}</strong>
        <button className="general-submit-btn search-purchase-button"><FormattedMessage id="search-purchase"/></button>
      </td></tr> : null

  return(
    <div id="searchResult">
        <table border="0">
          <thead className={tableContent ? 'search-table-feeded' : 'search-table-unfeeded'}>
              <tr>
                <th><FormattedMessage id="search-result-from"/></th>
                <th><FormattedMessage id="search-result-to"/></th>
                <th><FormattedMessage id="search-result-stops-num"/></th>
                <th><FormattedMessage id="search-result-stop-name"/></th>
                <th><FormattedMessage id="search-result-by"/></th>
                <th><FormattedMessage id="search-result-distance"/></th>
                <th><FormattedMessage id="search-result-duration"/></th>
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

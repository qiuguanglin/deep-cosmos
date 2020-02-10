import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import NumberFormat from '../util/NumberFormat';
import '../css/result.css';
import cartIcon from '../resource/icon/cart.png';

class SearchResultPanel extends PureComponent{
  constructor(props){
    super(props);
  }

  render(){
    const {results, language} = this.props;

    let totalPrice = 0;
    let lang = language === 'zh' ? 'cname' : 'name';//deternmins the language to display
    if(results){
      //format the price as currency
      totalPrice = NumberFormat(results.totalPrice);
    }

    const tableContent = (results && results.flights.length) ?
      results.flights.map(((res, index)=>
        <tr key={index} className="flightsInfo">
          <td>{res.begin[lang]}</td>
          <td>{res.end[lang]}</td>
          <td>{res.stopNum}</td>
          <td>{res.stops.map(st=>st[lang]).join(', ')}</td>
          <td>{res.shuttles.map(st=>st[lang])}</td>
          <td>{NumberFormat(res.sectionDistance, null, 'km')}</td>
          <td>
            {res.duration.hour} <FormattedMessage id="search-result-hour"/> {res.duration.min} <FormattedMessage id="search-result-min"/>
          </td>
        </tr>
      )): null;

    const purchaseContent = results ?
      <tr id="search-purchaseContent"><td colSpan="7">
        <img src={cartIcon}/>
        <FormattedMessage id="search-purchase-price"/> <strong>{totalPrice}</strong>
        <button className="general-submit-btn search-purchase-button"><FormattedMessage id="search-purchase"/></button>
      </td></tr> : null

    return (
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
}

export default SearchResultPanel;

import React from 'react';

const SearchResultPanel = ({results}) => {
  const tableContent = (results && results.length) ?
    results.map(((res, index)=>
      <tr key={index}>
        <td>{res.shuttleName}</td>
        <td>{res.dest}</td>
        <td>{res.dTime}</td>
        <td>{res.aTime}</td>
        <td>{res.duration}</td>
        <td>{res.transfer}</td>
        <td>{res.price}</td>
      </tr>
    )): <tr><td colSpan="7">没有搜索结果</td></tr>

  return(
    <div id="searchResult">
        <table border="0">
        <thead>
            <tr>
              <th>飞船名称</th>
              <th>目的地</th>
              <th>出发</th>
              <th>到达</th>
              <th>历时</th>
              <th>中转行星</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
    </div>
  );
}

export default SearchResultPanel;

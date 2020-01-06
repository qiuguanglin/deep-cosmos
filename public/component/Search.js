import React, {Component} from 'react';
import {Search} from '../rest/SearchRestful';
import {Data} from '../rest/DataRestful';

class SearchPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      beginning: '',
      destination: '',
    }

    this.onBeginningChange = this.onBeginningChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDestinationChange(e){
    this.setState({destination: e.target.value.trim()});
  }

  onBeginningChange(e){
    console.log(e.target.value);
    this.setState({beginning: e.target.value.trim()});
  }

  componentDidMount(){
    Data((err, data) => {
      if(err)throw err;
      const {flightsMap, planetList} = data.message;
      this.flightsMap = flightsMap;
      this.planetList = planetList;
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const {onSearchResult} = this.props;
    const {beginning, destination} = this.state;

    if(beginning && destination){
      Search(beginning, destination, this.flightsMap, this.planetList, (err, data) => {
        if(err)throw err;

        const result = [];
        const totalPrice = data.totalPrice;
        const lines = data.lines;

        for(let i=0; i<lines.length; i++){
          const {shuttles, stops} = lines[i];
          const [begin, end] = [stops[0], stops[stops.length - 1]];
          result.push({
            begin,
            end,
            stopNum: stops.length,
            stops,
            shuttles,
            duration: '1h'
          });
        }
        onSearchResult({flights: result, totalPrice})
      });
    }
  }

  render(){
    const {date, beginning, destination, message} = this.state;

    return(
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          始发：<input type="beginning" value={beginning} onChange={this.onBeginningChange}/>
          终点：<input type="destination" value={destination} onChange={this.onDestinationChange}/>
          <input type="submit" value="搜索"/>
        </form>
      </div>
    );
  }
}

export default SearchPanel;

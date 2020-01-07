import React, {Component} from 'react';
import {Search} from '../rest/SearchRestful';
import {Data} from '../rest/DataRestful';

class SearchPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      beginning: '',
      destination: '',
      beginningID: '',
      destinationID: '',
    }

    this.onBeginningChange = this.onBeginningChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSelectedPlaceID(e){
    const selectedValue = e.target.value.trim();
    const options = e.target.list.options;

    for(let i=0; i<options.length; i++){
      const option = options.item(i);
      if(option.value === selectedValue){
        return option.title;
      }
    }
    return undefined; //this could never happen except on purpose submitted via command or mal-input, out of malice
  }

  onDestinationChange(e){
    this.setState({destinationID: this.getSelectedPlaceID(e), destination: e.target.value.trim()});
  }

  onBeginningChange(e){
    this.setState({beginningID: this.getSelectedPlaceID(e), beginning: e.target.value.trim()});
  }

  componentDidMount(){
    Data((err, data) => {
      if(err)throw err;

      const {flightsMap, planetList} = data.message;
      this.flightsMap = flightsMap;
      this.planetList = planetList;

      this.dropdownData = planetList.map((planet, index) =>
        <option value={planet.name} key={index} title={planet.id}/>);
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const {onSearchResult} = this.props;
    const {beginning, destination, beginningID, destinationID} = this.state;

    if(beginningID && destinationID && beginning && destination){
      Search(beginningID, destinationID, this.flightsMap, this.planetList, (err, data) => {
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
        onSearchResult({flights: result, totalPrice});
      });
    }
  }

  render(){
    const {date, beginning, destination, message, isInputInvalid} = this.state;

    return(
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          <input list="beginStop"
            className="pickList"
            value={beginning}
            onChange={this.onBeginningChange} placeholder="起点星球" required/>
          <datalist id="beginStop">
            {this.dropdownData}
          </datalist>

          <input list="destination"
            className="pickList"
            value={destination}
            onChange={this.onDestinationChange} placeholder="终点星球" required/>
          <datalist id="destination">
            {this.dropdownData}
          </datalist>

          <input type="submit" value="搜索" id="searchFlightButton"/>
        </form>
      </div>
    );
  }
}

export default SearchPanel;

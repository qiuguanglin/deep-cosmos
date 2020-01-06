import React, {Component} from 'react';
import {FlightList} from '../rest/SearchRestful';

class SearchPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: '',
      beginning: '',
      destination: ''
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onBeginningChange = this.onBeginningChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDateChange(e){
    this.setState({date: e.target.value});
  }

  onDestinationChange(e){
    this.setState({destination: e.target.value});
  }

  onBeginningChange(e){
    this.setState({beginning: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const {onSearchResult} = this.props;
    const {beginning, destination} = this.state;
    if(beginning && destination){
      const results = FlightList(beginning, destination, (err, data) => {
        console.log(data);
      });
    }


    // onSearchResult([
    //   {shuttleName: 'Piarte1',
    //   dest: 'Mars',
    //   dTime: '2059-11-11 10:10',
    //   aTime: '2059-11-11 14:20',
    //   duration: '10h10m',
    //   transfer: 'Jupiter',
    //   price: 1000},
    //   {shuttleName: 'Piarte1',
    //   dest: 'Mars',
    //   dTime: '2059-11-11 10:10',
    //   aTime: '2059-11-11 14:20',
    //   duration: '10h10m',
    //   transfer: 'Jupiter',
    //   price: 1000}]);
  }

  render(){
    const {date, beginning, destination} = this.state;

    return(
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          启程日期：<input type="date" value={date} onChange={this.onDateChange}/>
          始发：<input type="beginning" value={beginning} onChange={this.onBeginningChange}/>
          终点：<input type="destination" value={destination} onChange={this.onDestinationChange}/>
          <input type="submit" value="搜索"/>
        </form>
      </div>
    );
  }
}

export default SearchPanel;

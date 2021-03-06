import React, {PureComponent} from 'react';
import {Search} from '../rest/SearchRestful';
import {Data} from '../rest/DataRestful';
import GeneralInputPanel from './GeneralInput';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import GeneralButtonPanel from './GeneralButton';
import '../css/search.css';

class SearchPanel extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      beginning: '',
      destination: '',
      beginningID: '',
      destinationID: '',
      planetList: []
    }

    this.onBeginningChange = this.onBeginningChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSwitchingDirection = this.onSwitchingDirection.bind(this);
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
    return undefined; //this could never happen except on purpose submittion via command or mal-input, out of malice
  }

  onSwitchingDirection(e){
    e.preventDefault();
    //when the switch directio button is clicked, the values in the fields and the ids also should be switched
    const {beginning, destination, beginningID, destinationID} = this.state;
    if(beginning && destination){
      const [sbeginning, sdestination, sbeginningID, sdestinationID]
        = [destination, beginning, destinationID, beginningID];
      this.setState({
        beginning: sbeginning,
        destination: sdestination,
        beginningID: sbeginningID,
        destinationID: sdestinationID
      });
    }
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

      const {flightsMap, planetList, routeCostMap} = data.message;
      this.flightsMap = flightsMap;
      this.routeCostMap = routeCostMap;
      this.setState({planetList});
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const {onSearchResult} = this.props;
    const {beginning, destination, beginningID, destinationID, planetList} = this.state;

    if(beginningID && destinationID && beginning && destination){
      Search(beginningID, destinationID, this.flightsMap, planetList, this.routeCostMap, (err, data) => {
        if(err)throw err;

        const result = [];
        const totalPrice = data.totalPrice;
        const lines = data.lines

        for(let i=0; i<lines.length; i++){
          const {shuttles, stops, sectionDistance, duration} = lines[i];
          const [begin, end] = [stops[0], stops[stops.length - 1]];

          result.push({
            begin,
            end,
            stopNum: stops.length,
            stops,
            shuttles,
            sectionDistance,
            duration: duration,
          });
        }
        onSearchResult({flights: result, totalPrice});
      });
    }
  }

  render(){
    const {date, beginning, destination, message, isInputInvalid, planetList} = this.state;
    const {language}=this.props;

    const dropdownData = planetList.map((planet, index) =>
      <option value={language === 'zh' ? planet.cname : planet.name} key={index} title={planet.id}/>);

    return(
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          <GeneralInputPanel list="beginStop"
            className="pickList"
            value={beginning}
            onChange={this.onBeginningChange} placeholder="search-field-from" required="required"/>
          <datalist id="beginStop">
            {dropdownData}
          </datalist>

          <span id="search-switch-direction" onClick={this.onSwitchingDirection}>
            <span className="arrow left-arrow"></span>
            <FormattedHTMLMessage id="search-arrow"/>
            <span className="arrow right-arrow"></span>
          </span>

          <GeneralInputPanel list="destination"
            className="pickList"
            value={destination}
            onChange={this.onDestinationChange} placeholder="search-field-to" required/>
          <datalist id="destination">
            {dropdownData}
          </datalist>

          <GeneralButtonPanel type="submit" value="search-button" className="searchFlightButton general-submit-btn"/>
        </form>
      </div>
    );
  }
}

export default SearchPanel;

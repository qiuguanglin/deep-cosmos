import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './component/Navigation';
import TopPanel from './component/Top';
import SearchPanel from './component/Search';
import SearchResultPanel from './component/SearchResult';
import PromotionPanel from './component/Promotion';

class App extends Component{
  constructor(){
    super();
    this.state = {
      isLoggedin: true,
      language: 'schn',
      searchResults: []
    }

    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.onLoginStatusChanged = this.onLoginStatusChanged.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
  }

  onLanguageChanged(e){
    console.log(e.target.value)
  }

  onLoginStatusChanged(){
    console.log()
  }

  onSearchResult(results){
    this.setState({searchResults: results});
  }

  render(){
    const {isLoggedin, searchResults} = this.state;
    return(
      <div>
        <Navigation onLanguageChanged={this.onLanguageChanged}
        onLoginStatusChanged={this.onLoginStatusChanged}
        isLoggedin={isLoggedin}/>
        <TopPanel/>
        <SearchPanel onSearchResult={this.onSearchResult}/>
        <SearchResultPanel results={searchResults}/>
        <PromotionPanel/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './component/Navigation';
import TopPanel from './component/Top';
import SearchPanel from './component/Search';
import SearchResultPanel from './component/SearchResult';
import PromotionPanel from './component/Promotion';
import FooterPanel from './component/Footer';
import SigninPanel from './component/Signin';

class App extends Component{
  constructor(){
    super();
    this.state = {
      isLoggedin: false,
      language: 'schn',
      searchResults: [],
      wannaSignin: false,
    }

    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.onLoginStatusChanged = this.onLoginStatusChanged.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
    this.onWannaSignInChange = this.onWannaSignInChange.bind(this);
    this.onClosingSigninBox = this.onClosingSigninBox.bind(this);
  }

  componentDidMount(){
    console.log('mounted')
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

  onWannaSignInChange(){
    this.setState({wannaSignin: true});
  }

  onClosingSigninBox(){
    this.setState({wannaSignin: false});
  }

  render(){
    const {isLoggedin, searchResults, wannaSignin} = this.state;
    return(
      <div>
        {wannaSignin ? <SigninPanel onClosingSigninBox={this.onClosingSigninBox}/> : null}
        <div id="mainPanel" className={wannaSignin ? 'blurBg' : ''}>
          <Navigation onLanguageChanged={this.onLanguageChanged}
          onLoginStatusChanged={this.onLoginStatusChanged}
          onSigninClick={this.onWannaSignInChange}
          isLoggedin={isLoggedin}/>
          <TopPanel/>
          <SearchPanel onSearchResult={this.onSearchResult}/>
          <SearchResultPanel results={searchResults}/>
          <PromotionPanel/>
          <FooterPanel/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

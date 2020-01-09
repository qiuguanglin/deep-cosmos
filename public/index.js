import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './component/Navigation';
import TopPanel from './component/Top';
import SearchPanel from './component/Search';
import SearchResultPanel from './component/SearchResult';
import PromotionPanel from './component/Promotion';
import FooterPanel from './component/Footer';
import SigninPanel from './component/Signin';
import {AmIin} from './rest/UserRestful';

class App extends Component{
  constructor(){
    super();
    this.state = {
      loginFlag: false,
      language: 'ch',
      searchResults: null,
      wannaSignin: false,
      displayingName: '',
    }

    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.onSigninStatus = this.onSigninStatus.bind(this);
    this.onSignoutStatus = this.onSignoutStatus.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.currencyFormatRegx = /(\d)(?=(\d{3})+\.)/g;
  }

  componentDidMount(){
    //on app loading check the login status and change the header
    AmIin((err, data) => {
      const displayingName = data ? (data.message.nickname || data.message.username) : null;
      this.setState({loginFlag: err ? false : data.success, displayingName})
    });
  }

  onLanguageChanged(e){
    console.log(e.target.value)
  }

  onSigninStatus({isSuccess, displayingName}){
    //when login successfully change the header, and hide the login panel
    this.setState({loginFlag: isSuccess, wannaSignin: !isSuccess, displayingName});
  }

  onSignoutStatus({isSuccess}){
    this.setState({loginFlag: isSuccess});
  }

  onSearchResult(results){
    this.setState({searchResults: results});
  }

  //hide the login window when ESC key is pressed
  onKeyDown(event){
    if(!this.state.wannaSignin)return;
    this.setState({wannaSignin: event.keyCode !== 27})
  }

  render(){
    const {loginFlag, searchResults, wannaSignin, displayingName} = this.state;

    return(
      <div>
        {wannaSignin ?
          <SigninPanel
          onClosingSigninBox={() => this.setState({wannaSignin: false})}
          onSigninStatus={this.onSigninStatus}/>
          : null}

        <div id="mainPanel" className={wannaSignin ? 'blurBg' : ''} onKeyDown={this.onKeyDown}>
          <Navigation onLanguageChanged={this.onLanguageChanged}
          onSigninClick={() => this.setState({wannaSignin: true})}
          onSignoutStatus={this.onSignoutStatus}
          loginFlag={loginFlag}
          displayingName={displayingName}/>

          <TopPanel/>
          <SearchPanel onSearchResult={this.onSearchResult}/>
          <SearchResultPanel results={searchResults} currencyFormatRegx={this.currencyFormatRegx}/>
          <PromotionPanel currencyFormatRegx={this.currencyFormatRegx}/>
          <FooterPanel/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

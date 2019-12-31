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
      language: 'schn',
      searchResults: [],
      wannaSignin: false,
    }

    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.onSigninStatus = this.onSigninStatus.bind(this);
    this.onSignoutStatus = this.onSignoutStatus.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
    this.onWannaSignInChange = this.onWannaSignInChange.bind(this);
    this.onClosingSigninBox = this.onClosingSigninBox.bind(this);
  }

  componentDidMount(){
    AmIin((err, data)=>this.setState({loginFlag: err ? false : data.success}));
  }

  onLanguageChanged(e){
    console.log(e.target.value)
  }

  onSigninStatus(loginFlag){
    this.setState({loginFlag: loginFlag});
  }

  onSignoutStatus(signoutFlag){
    this.setState({loginFlag: signoutFlag});
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
    const {loginFlag, searchResults, wannaSignin} = this.state;
    return(
      <div>
        {wannaSignin ? <SigninPanel onClosingSigninBox={this.onClosingSigninBox}
        onSigninStatus={this.onSigninStatus}/> : null}

        <div id="mainPanel" className={wannaSignin ? 'blurBg' : ''}>
          <Navigation onLanguageChanged={this.onLanguageChanged}
          onSigninClick={this.onWannaSignInChange}
          onSignoutStatus={this.onSignoutStatus}
          loginFlag={loginFlag}/>

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

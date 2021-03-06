import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './component/Navigation';
import TopPanel from './component/Top';
import SearchPanel from './component/Search';
import SearchResultPanel from './component/SearchResult';
import PromotionPanel from './component/Promotion';
import FooterPanel from './component/Footer';
import SigninPanel from './component/Signin';
import AboutPanel from './component/About';
import ContactPanel from './component/Contact';
import {AmIin} from './rest/UserRestful';
import {CSRF} from './rest/CSRFRestful';
import {IntlProvider, FormattedMessage} from 'react-intl';
import EN from "./translate/en.json";
import ZH from "./translate/zh.json";
import './css/root.css';
import './css/main.css';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      loginFlag: false,
      language: 'zh',
      searchResults: null,
      wannaSignin: false,
      displayingName: '',
      tabToggled: false,
      modalWindowNumber: 0,
    }

    this.ModalWindowMap = {
      1: <AboutPanel onToggleInfoWindow={this.onToggleInfoWindow.bind(this)}/>,
      2: <ContactPanel onToggleInfoWindow={this.onToggleInfoWindow.bind(this)}/>
    }

    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.onSigninStatus = this.onSigninStatus.bind(this);
    this.onSignoutStatus = this.onSignoutStatus.bind(this);
    this.onSearchResult = this.onSearchResult.bind(this);
    this.onTabToggled = this.onTabToggled.bind(this);
    this.onToggleInfoWindow = this.onToggleInfoWindow.bind(this);
  }

  componentDidMount(){
    //fetch the CSRF token
    CSRF((err, data)=>{});

    //on app loading check the login status and change the header
    AmIin((err, data) => {
      const displayingName = data ? (data.message.nickname || data.message.username) : null;
      this.setState({loginFlag: err ? false : data.success, displayingName})
    });

    //check the client language environment
    let clientLang = 'en';
    if(navigator.language && navigator.language.split){
      clientLang = navigator.language.split(/[-_]/)[0];
    }
    this.setState({language: clientLang});
  }

  onLanguageChanged(e){
    this.setState({language: e.target.value});
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

  onTabToggled(e){
    const isTabToggled = this.state.tabToggled;
    const className = e.target.className;

    if((isTabToggled && className === 'main-tab-toggled')
    || (!isTabToggled && className === 'main-tab-toggled')){
      return;
    }

    const tabToggled = !this.state.tabToggled;
    this.setState({tabToggled});
  }

  onToggleInfoWindow(e){
    const windowId = e.target.id;
    //when the toggling is triggered by the button inside the modal window, its id is empty string
    //so setting the modalWindowNumber 0 will hide the modal window as expected
    const modalWindowNumber = isNaN(parseInt(windowId)) ? 0 : windowId;
    this.setState({modalWindowNumber});
  }

  render(){
    const {loginFlag, searchResults, wannaSignin, displayingName,
      tabToggled, modalWindowNumber, language, csrfToken} = this.state;
    const LANGUAGE = language === 'zh' ? ZH : EN;

    return(
      <IntlProvider locale="zh" messages={LANGUAGE}>
        <div id="root">
          {this.ModalWindowMap[modalWindowNumber]}

          {wannaSignin ?
            <SigninPanel
            onClosingSigninBox={() => this.setState({wannaSignin: false})}
            onSigninStatus={this.onSigninStatus}/>
            : null}

          <div className={wannaSignin || (modalWindowNumber > 0) ? 'blurBg' : ''}>
            <Navigation onLanguageChanged={this.onLanguageChanged}
            onSigninClick={() => this.setState({wannaSignin: true})}
            onSignoutStatus={this.onSignoutStatus}
            onToggleInfoWindow={this.onToggleInfoWindow}
            loginFlag={loginFlag}
            displayingName={displayingName}
            defaultLang={language}
            />

            <TopPanel/>

            <div>
              <div id="main-tab">
                <button className={tabToggled ? 'main-tab-toggled' : 'main-tab-untoggled'} onClick={this.onTabToggled}>
                  <FormattedMessage id="main-tab-promotion"/>
                </button>
                <button className={tabToggled ? 'main-tab-untoggled' : 'main-tab-toggled'} onClick={this.onTabToggled}>
                  <FormattedMessage id="main-tab-search"/>
                </button>
              </div>

              <div id="main-tab-content">
                {
                  tabToggled ? (<PromotionPanel language={language}/>) : (
                    <div>
                      <SearchPanel onSearchResult={this.onSearchResult} language={language}/>
                      <SearchResultPanel results={searchResults} language={language}/>
                    </div>
                  )
                }
              </div>
            </div>
            <FooterPanel/>
          </div>
        </div>
      </IntlProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

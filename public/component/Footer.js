import React from 'react';
import {FormattedMessage} from 'react-intl';
import '../css/footer.css';
import houseIcon from '../resource/icon/house.png';
import instIcon from '../resource/icon/inst.png';
import twitterIcon from '../resource/icon/twitter.png';
import lineIcon from '../resource/icon/line.png';
import whatsappIcon from '../resource/icon/whatsapp.png';

const FooterPanel = ()=>{
  return(
    <footer>
      <div id="copyright">
        <FormattedMessage id="footer-rights-reserved"/>
        <br/>
        <img src={houseIcon}/> <FormattedMessage id="footer-address"/>
        <h4>
          <img src={twitterIcon}/>
          <img src={lineIcon}/>
          <img src={instIcon}/>
          <img src={whatsappIcon}/>
        </h4>
      </div>
    </footer>
  );
}

export default FooterPanel;

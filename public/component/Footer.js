import React from 'react';
import {FormattedMessage} from 'react-intl';
import '../css/footer.css';

const FooterPanel = ()=>{
  return(
    <footer>
      <div id="copyright">
        <FormattedMessage id="footer-rights-reserved"/>
        <br/>
        <img src="./resource/icon/house.png"/> <FormattedMessage id="footer-address"/>
        <h4>
          <img src="./resource/icon/twitter.png"/>
          <img src="./resource/icon/line.png"/>
          <img src="./resource/icon/inst.png"/>
          <img src="./resource/icon/whatsapp.png"/>
        </h4>
      </div>
    </footer>
  );
}

export default FooterPanel;

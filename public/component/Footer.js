import React from 'react';
import {FormattedMessage} from 'react-intl';

const FooterPanel = ()=>{
  return(
    <footer>
      <div id="copyright">
        <FormattedMessage id="footer-rights-reserved"/>
        <br/>
        <img src="./resource/icon/house.png"/> <FormattedMessage id="footer-address"/>
      </div>
    </footer>
  );
}

export default FooterPanel;

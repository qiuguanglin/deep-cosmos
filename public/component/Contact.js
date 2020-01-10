import React from 'react';
import InfoPanel from './Info';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

const ContactPanel = ({onToggleInfoWindow}) => {
  const contact = <FormattedMessage id="contact-title"/>;
  const content = <FormattedHTMLMessage id="contact-content"/>;

  return (<InfoPanel onToggleInfoWindow={onToggleInfoWindow} title={contact} content={content}/>);
}

export default ContactPanel;

import React from 'react';
import InfoPanel from './Info';

const ContactPanel = ({onToggleInfoWindow}) => {
    const createHTML = () => {
      return {__html: '\
        电话：8613928727270<br/>\
        邮箱：qiuguanglin@hotmail.com\
      '}
    };
    return (<InfoPanel onToggleInfoWindow={onToggleInfoWindow} title="联系我们" createHTML={createHTML}/>);
}

export default ContactPanel;

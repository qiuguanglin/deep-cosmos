'use strict';

import React, {Component} from 'react';
import {injectIntl} from 'react-intl';

class GeneralInputPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {type, value, placeholder, onChange, className, list, required, size, intl}=this.props;
    const transcript = placeholder ? intl.formatMessage({id: placeholder}) : null;

    return <input type={type} value={value} placeholder={transcript}
            onChange={onChange} className={className} list={list} required={required} size={size}/>;
  }
}

export default injectIntl(GeneralInputPanel);

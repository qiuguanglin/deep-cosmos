'use strict';

import React, {Component} from 'react';
import {injectIntl} from 'react-intl';

class GeneralButtonPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {value, className, onClick, type, intl}=this.props;
    const transcript = intl.formatMessage({id: value});

    return <input value={transcript} className={className} onClick={onClick} type={type}/>;
  }
}

export default injectIntl(GeneralButtonPanel);

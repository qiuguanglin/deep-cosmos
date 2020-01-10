'use strict';

import React, {Component} from 'react';
import {injectIntl} from 'react-intl';


class GeneralInputPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {type, intl, placeHolder, className, list, value, onChange}=this.props;
    // console.log(intl);
    const ph=placeHolder?intl.formatMessage({id: placeHolder}):null;
    return <input value={value} onChange={onChange} type={type} placeholder={ph} className={className} list={list}/>;
  }
}



export default injectIntl(GeneralInputPanel);

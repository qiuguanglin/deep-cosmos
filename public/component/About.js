import React from 'react';
import InfoPanel from './Info';
import {FormattedHTMLMessage} from 'react-intl';

const AboutPanel = ({onToggleInfoWindow}) => {
    const title = <FormattedHTMLMessage id="about-title"/>
    const content = <FormattedHTMLMessage id="about-content"/>

    return (<InfoPanel onToggleInfoWindow={onToggleInfoWindow} title={title} content={content}/>);
}

export default AboutPanel;

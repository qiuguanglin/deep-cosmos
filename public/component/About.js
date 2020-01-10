import React from 'react';
import InfoPanel from './Info';

const AboutPanel = ({onToggleInfoWindow}) => {
    return (<InfoPanel onToggleInfoWindow={onToggleInfoWindow} title="关于深空" content="
    深空星际成立于公元2108年，总部设在月宫基地一号，
    员工数2000人／台，其中人类占8%，其余为机器人。
    目前公司已在地球，月球、土卫一三个地区有分支机构。
    深空星际致力于开发银河系的旅游资源，积极研发登陆设施以及基础交通建设，
    同时经营捷运和旅游服务，把源源不绝的地球
    旅客们安全地送达旅游点。"/>);
}

export default AboutPanel;

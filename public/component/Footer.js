import React from 'react';

const FooterPanel = ()=>{
  return(
    <footer>
      <div id="about">
        <h3>关于深空(Deep Cosmos)</h3>
        <p>
          深空星际成立于公元3008年，总部设在月球中卫一号，员工数2000人／台，其中人类占8%，其余为机器人AI。
          目前公司已在地球，月球、土卫一三个地区有分支机构。
          深空星际致力于开发银河系的旅游资源，并且积极研发登陆设施以及星体基础建设，同时经营旅游业，把源源不绝的地球
          旅客们安全地送达旅游点。
        </p>
      </div>

      <div id="copyright">
        版权所有 公元2054-2098, sentiment-bin.com. All Rights Reserved.
        <br/>
        <img src="./resource/icon/house.png"/> 月球第18号基地备1813928727270号
      </div>
    </footer>
  );
}

export default FooterPanel;

'use strict';
import React from 'react';
import '../css/cornerclose.css';

const CornerClosePanel = ({onToggleInfoWindow}) => <label id="cornerClose" onClick={onToggleInfoWindow}>X</label>

export default CornerClosePanel;

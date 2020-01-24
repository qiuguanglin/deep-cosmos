'use strict';
import formatNumber from 'format-number';

export default (price, prefix='¥', suffix='') => formatNumber({prefix, suffix})((+price).toFixed(2));

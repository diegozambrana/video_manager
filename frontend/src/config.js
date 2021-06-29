import {isMobile} from './utils';

export const production = false;
export const ENABLED_ADS = false; // !isMobile() && production;

export const API_DOMAIN = production ? "" : "http://localhost:8000";
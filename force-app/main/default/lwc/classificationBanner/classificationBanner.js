import { LightningElement, api } from 'lwc';
const SLDS_THEME = 'slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_';

export default class ClassificationBanner extends LightningElement {
    @api message;
    @api theme;
    bannerTheme = null;

    connectedCallback() {
        this.bannerTheme = SLDS_THEME + this.theme;
    }
}
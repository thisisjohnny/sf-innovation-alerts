import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import SCORE from '@salesforce/schema/Innovation_Entry__c.Final_Score__c';
const SLDS_THEME = 'slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_';

export default class InnovationScoreSummary extends LightningElement {
    @api recordId;
    @api positiveThreshold;
    @api neutralThreshold;
    message = null;
    iconName = 'utility:info_alt';
    altText = 'Score summary for innovation entry';
    bannerTheme = null;

    @wire(getRecord, { recordId: '$recordId', fields: [SCORE] })
    wiredRecord({ data, error }) {
        if (data) {
            let score = getFieldValue(data, SCORE);
            if (score >= this.positiveThreshold) {
                this.bannerTheme = SLDS_THEME + 'success';
                this.message = 'Score Above Threshold';
                this.iconName = 'utility:success';
            } else if (score < this.positiveThreshold && score >= this.neutralThreshold) {
                this.bannerTheme = SLDS_THEME + 'warning';
                this.message = 'Score Within Threshold';
                this.iconName = 'utility:rating';
            } else {
                this.bannerTheme = SLDS_THEME + 'error';
                this.message = 'Score Below Threshold';
                this.iconName = 'utility:warning';
            }
        }
    }

    connectedCallback() {
        this.bannerTheme = SLDS_THEME + 'info';
    }
}
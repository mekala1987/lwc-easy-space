import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomerTile extends NavigationMixin(LightningElement) {

    @api customer;
    @api object;
    navRef;

    connectedCallback() {
        
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.customer.Id,
                actionName: 'view'
            }
        }).then(url => {
                this.navRef= url;
                //console.log(this.navRef);
        });
        
    }

    get icon() {
        return 'standard:' + this.object.toLowerCase();
    }

    get alttext() {
        return 'Navigate to '+this.object+' record detail for '+this.customer.name;
    }

    handleClick(){
        const clickevt = new CustomEvent('customerselect', {
            detail: {
                customerId: this.customer.Id,
                sobjectType: this.object,
                state: this.customer.state
            }
        });
        this.dispatchEvent(clickevt);
    }
}
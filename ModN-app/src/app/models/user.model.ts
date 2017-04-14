export class Address{
    
}
export class User {
    /*
     * Account Infomation 
     */
    id:number;
    username:string;
    email:string;
    password:string;

    /*
     * Real Name Authentication Infomation 
     */
    lastName:string;
    firstName:string;
    name:string;
    cellPhone:string;
    sex:string;

    /*
     * Timestamps
     */
    timeUpdated:string;
    timeCreated:string;
    

    /* 
     * Account Statement Infomation
     */
    authenticated:boolean;
    account_lock:boolean;

    /* 
     * Shipping Address
     */
    addresses:Array<Address>;
}

export class OrderGroup{

}
export class Order{
    private id:number;
    public number:string;
    public status:string;
    public total:number;
    public total_tax:number;
    public date_created:Date;
    public date_updated:Date;
    public order_items:Array<OrderItem>;
    
    public addOrderItem(order_item:OrderItem):void{

    }
    public removeOrderItem(id:number):void{

    }
    public calcTotal():void{

    }
    public calcTotalTax():void{

    }
    public changeStatus(status:string):void{
        this.status = status
    }
}
export class OrderItem{
    private id:number;
    public description:string;
    //public commition_type:String;
    public price:number;
    public quantity:number;
    public retail_price:number;
    public sale_price:number;
    public date_created:Date;
    public date_updated:Date;

    public incrementQuantity():void{
        this.quantity = this.quantity + 1; 
    }
    public decrementQuantity():void{
        this.quantity = this.quantity - 1;
    }
    public getId():number{
        return this.id;
    }
    

}

export class FulfillmentOption{
    
}

export class FulfillmentItem{
    
}

export class FulfillmentGroup{

}

export class Payment{

}

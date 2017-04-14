
export class Seller{

}
export class Market{

}


export class Option{

}

export class Product{
    private id:number;
    public name:string;
    //public likes:number;
    //public shares:number;
    public avg_rating:number;
    public date_updated:Date;
    public date_created:Date;
    //public category:Category;
    public skus:Array<Sku>;

    constructor(){

    }
    //public decrementLike
}

export class Sku{
    private id:number;
    public description:String;
    //commission_type:String;
    public retail_price:number;
    public sale_price:number;
    public date_created:Date;
    public date_updated:Date;

}

class Media{

}

class Review{

}

class ReviewFeedback{

}
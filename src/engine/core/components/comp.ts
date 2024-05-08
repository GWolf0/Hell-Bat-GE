import { GameObject } from "../gameObject";

export abstract class Comp{
    id:number;
    name:string;
    gameObject:GameObject|null;
    active:boolean=true;

    constructor(id:number,name:string,gameObject:GameObject|null=null){
        this.id=id;
        this.name=name;
        this.gameObject=gameObject;
    }

    setGameObject(go:GameObject|null){
        this.gameObject=go;
        this.onGameObjectChanged();
    }

    masterUpdate(){
        if(!this.active)return;
        this.update();
    }

    // @overrides
    onGameObjectChanged():void{};
    abstract update():void;

}
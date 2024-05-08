import { BoxCollider } from "../colliders";
import { Rect, V2 } from "../commonObjects";
import { GameObject } from "../gameObject";
import { Renderer } from "../renderer";
import { Comp } from "./comp";

export class ColliderComp extends Comp{
    static id:number=1;

    colliderOffs:V2=V2.zero();
    colliderExtraSize:V2=V2.zero();
    collider:BoxCollider;

    constructor(collider:BoxCollider=new BoxCollider()){
        super(ColliderComp.id,"Collider");
        this.collider=collider;
    }

    update():void{
        if(this.gameObject){
            this.collider.setFromGameObject(this.gameObject);
        }
        if(Renderer.renderColliders)Renderer.renderCollider(this.collider);
    }

}
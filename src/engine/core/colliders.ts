import { Line, Rect, V2 } from "./commonObjects";
import { GameObject } from "./gameObject";
import { Sprite } from "./sprite";

export type ColliderType="box"|"circle";
export class Collider{
    type:ColliderType;

    constructor(type:ColliderType){
        this.type=type;
    }

}

export class BoxCollider extends Collider{
    static CORNERS_MARGIN:number=0.25;

    rect:Rect;
    get rect2():Rect{return this.rect.rect2} // Return corners
    sidesLines!:[left:Line,top:Line,right:Line,bottom:Line];
    center:V2;
    offs:V2=V2.zero();
    size:V2=V2.zero();

    constructor(center:V2=V2.zero(),offs:V2=V2.zero(),size:V2=V2.zero()){
        super("box");
        this.center=center;
        this.offs=offs;
        this.size=size;
        this.rect=new Rect(center.x+offs.x,center.y+offs.y,size.x,size.y);
        this.updateSidesLines();
    }

    static fromGameObject(go:GameObject,extraOffs:V2=V2.zero(),extraSize:V2=V2.zero()):BoxCollider{
        return new BoxCollider(new V2(go.t.pos.x,go.t.pos.y),V2.add(new V2(0,0),extraOffs),V2.add(new V2(go.t.scl.x,go.t.scl.y),extraSize));
    }

    setFromGameObject(go:GameObject){
        // console.log(go.name,go.t.pos,go.t.scl)
        this.center.set(go.t.pos.x,go.t.pos.y);
        // console.log(this.center.x+this.offs.x,this.center.y+this.offs.y,this.size.x,this.size.y)
        this.set(this.center.x+this.offs.x,this.center.y+this.offs.y,this.size.x,this.size.y);
    }
    set(x:number,y:number,w:number,h:number){
        this.rect.set(x,y,w,h);
        this.updateSidesLines();
    }

    updateSidesLines(){
        if(!this.sidesLines)this.sidesLines=[Line.zero(),Line.zero(),Line.zero(),Line.zero()];
        this.sidesLines[0]=new Line((this.rect.x),(this.rect.y+this.rect.h)-this.rect.h*BoxCollider.CORNERS_MARGIN,(this.rect.x),(this.rect.y)+this.rect.h*BoxCollider.CORNERS_MARGIN);
        this.sidesLines[1]=new Line((this.rect.x)+this.rect.w*BoxCollider.CORNERS_MARGIN,(this.rect.y),(this.rect.x+this.rect.w)-this.rect.w*BoxCollider.CORNERS_MARGIN,(this.rect.y));
        this.sidesLines[2]=new Line((this.rect.x+this.rect.w),(this.rect.y)+this.rect.h*BoxCollider.CORNERS_MARGIN,(this.rect.x+this.rect.w),(this.rect.y+this.rect.h)-this.rect.h*BoxCollider.CORNERS_MARGIN);
        this.sidesLines[3]=new Line((this.rect.x)+this.rect.w*BoxCollider.CORNERS_MARGIN,(this.rect.y+this.rect.h),(this.rect.x+this.rect.w)-this.rect.w*BoxCollider.CORNERS_MARGIN,(this.rect.y+this.rect.h));
    }

}

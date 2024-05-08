import { V2 } from "../commonObjects";
import { WindowManager } from "../windowManager";
import { Comp } from "./comp";

export class TransformComp extends Comp{
    static id:number=0;
    
    _pos:V2; rot:number; scl:V2; parent!:TransformComp|null; children:TransformComp[];

    get dir():V2{return new V2(Math.cos(this.rot),Math.sin(this.rot));}
    get pos():V2{return this.parent?V2.add(this._pos,this.parent.pos):this._pos;}

    constructor(_pos:V2=V2.zero(),rot:number=0,scl:V2=V2.one(),parent:TransformComp|null=null){
        super(TransformComp.id,"Transform");
        // this._pos=new V2(_pos.x.toString().includes(".")?WindowManager.width*_pos.x:_pos.x, _pos.y.toString().includes(".")?WindowManager.height*_pos.y:_pos.y);
        this._pos=_pos;
        this.rot=rot;
        this.scl=scl;
        // this.scl=new V2(scl.x.toString().includes(".")?WindowManager.width*scl.x:scl.x, scl.y.toString().includes(".")?WindowManager.height*scl.y:scl.y);
        this.children=[];
        this.setParent(parent);
    }
    static default():TransformComp{
        return new TransformComp();
    }

    setParent(parent:TransformComp|null){
        this.parent=parent;
        if(this.parent)this.parent.children.push(this);
    }

    setFrom(t:TransformComp){
        this._pos=t._pos;
        this.rot=t.rot;
        this.scl=t.scl;
    }

    update():void{
        
    }

}
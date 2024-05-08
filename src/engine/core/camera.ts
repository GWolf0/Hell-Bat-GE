import { V2 } from "./commonObjects";
import { TransformComp } from "./components/transformComp";
import { GameObject } from "./gameObject";
import { WindowManager } from "./windowManager";

export class Camera extends GameObject{
    followTarget:GameObject|null=null;
    followOffs:V2=V2.zero();

    constructor(t:TransformComp=TransformComp.default()){
        super("Camera");
        this.t.setFrom(t);
    }

    init(){
        
    }

    update(){
        this.updateFollowTarget();
    }

    updateFollowTarget(){
        if(!this.followTarget)return;
        const targetPos:V2=new V2(this.followTarget.t.pos.x-WindowManager.width*0.5,this.followTarget.t.pos.y-WindowManager.height*0.5);
        this.t._pos=V2.lerp(this.t._pos,targetPos,0.1);
    }

    setFollowTarget(target:GameObject|null,followOffs:V2=V2.zero()){
        this.followTarget=target;
        this.followOffs=followOffs;
    }

}
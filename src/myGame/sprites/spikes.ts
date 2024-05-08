import { MAnimation } from "../../engine/core/animations";
import { AssetLoader } from "../../engine/core/assetsLoader";
import { BoxCollider } from "../../engine/core/colliders";
import { V2 } from "../../engine/core/commonObjects";
import { BodyComp } from "../../engine/core/components/bodyComp";
import { ColliderComp } from "../../engine/core/components/colliderComp";
import { TransformComp } from "../../engine/core/components/transformComp";
import { GameObject } from "../../engine/core/gameObject";
import { InputService } from "../../engine/core/inputService";
import { Sprite } from "../../engine/core/sprite";
import { SpikeSpawner } from "../misc/spikesSpawner";

export class Spike extends GameObject{
    static spikeOffs:number=100;
    static spikeWidth:number=300;
    static spikeHeight:number=48;
    static speed:number=3;

    spawner:SpikeSpawner;
    leftSide:Sprite;
    rightSide:Sprite;
    scoreTooken:boolean=false;

    constructor(pos:V2,spawner:SpikeSpawner){
        super("Spike");
        this.t.setFrom(new TransformComp(pos));
        this.spawner=spawner;
        this.leftSide=new Sprite("spikeLeftSide",new TransformComp(new V2(-Spike.spikeWidth-Spike.spikeOffs,0),0,new V2(Spike.spikeWidth,Spike.spikeHeight)),"platform","static");
        this.rightSide=new Sprite("spikeRightSide",new TransformComp(new V2(Spike.spikeOffs,0),0,new V2(Spike.spikeWidth,Spike.spikeHeight)),"platform","static");
        this.leftSide.t.setParent(this.t);
        this.rightSide.t.setParent(this.t);
        // Setup body and the collider between the two sides, !the spike gameobject position is the center of the two spike sides!
        const collider:BoxCollider=BoxCollider.fromGameObject(this,new V2(this.leftSide.t._pos.x+this.leftSide.t.scl.x,-Spike.spikeHeight),new V2(this.rightSide.t._pos.x-(this.leftSide.t._pos.x+this.leftSide.t.scl.x),Spike.spikeHeight));
        const colliderComp:ColliderComp=new ColliderComp(collider);
        const body:BodyComp=new BodyComp("trigger",collider);
        this.addComponent(colliderComp);
        this.addComponent(body);
    }

    init(){
        super.init();
    }

    update(){
        this.updateMovement();
        super.update();
    }

    updateMovement(){
        this.t._pos.y+=Spike.speed*this.spawner.diffMul;
    }

}
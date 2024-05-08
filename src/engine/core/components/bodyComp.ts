import { G } from "../../utils/draw";
import { BoxCollider } from "../colliders";
import { Rect, V2 } from "../commonObjects";
import { GameObject } from "../gameObject";
import { CollisionSide, PhysicsManager } from "../physicsManager";
import { Renderer } from "../renderer";
import { Time } from "../time";
import { Comp } from "./comp";

export type BodyType="none"|"trigger"|"static"|"rigid";
export class BodyComp extends Comp{
    static id:number=2;
    static UIDs:number=1;
    static MAX_GRAVITY:number=20;

    uid:number;
    type:BodyType;
    collider!:BoxCollider;
    acc:V2=V2.zero();
    vel:V2=V2.zero();
    friction:number;
    restitution:number;
    isGrounded:boolean=false;
    gravityScale:number=1;
    stop:boolean=false;
    onCollisionEnter:((body:BodyComp)=>any)|null=null;

    constructor(type:BodyType,collider:BoxCollider,friction:number=0.95,restitution:number=1.1){
        super(BodyComp.id,"Body");
        this.uid=BodyComp.UIDs++;
        this.type=type;
        this.friction=friction;
        this.restitution=restitution;
        this.collider=collider;
    }

    update(){}

    updateMovement(){
        // if(this.stop)return;
        if(!this.gameObject||!this.collider)return;
        if(this.type!=="rigid")return;
        if(!this.isGrounded)this.acc.y+=PhysicsManager.G*this.gravityScale;
        this.acc.y=Math.min(this.acc.y,BodyComp.MAX_GRAVITY);
        this.vel.x+=this.acc.x;
        this.vel.y+=this.acc.y;
        this.vel.x*=this.friction;
        this.vel.y*=this.friction;
        this.gameObject.t._pos.x+=this.vel.x*Time.dts;
        this.gameObject.t._pos.y+=this.vel.y*Time.dts;
        this.updateCollider();
        this.isGrounded=false;
    }

    updateCollider(){
        this.collider.setFromGameObject(this.gameObject!);
    }

    setVelocity(x:number,y:number,resetAcceleration:boolean=true){
        if(resetAcceleration){
            this.resetAcceleration(Math.abs(x)>0, Math.abs(y)>0);
        }
        this.vel.x=x;
        this.vel.y=y;
    }
    resetAcceleration(x:boolean=true,y:boolean=true){
        if(x)this.acc.x=0;
        if(y)this.acc.y=0;
    }

    reactToCollision(colSide:CollisionSide){
        if(!this.gameObject)return;
        this.stop=true;
        let moveX=0;
        let moveY=0;
        switch(colSide){
            case "left":moveX=-1; 
                break;
            case "right":moveX=1;
                break;
            case "top":moveY=-1;
                break;
            case "bottom":moveY=1; 
                break;
            default:
                break;
        }
        // console.log(colSide)
        let xoffs:number=(-this.vel.x*this.restitution*Time.dts);
        let yoffs:number=(-this.vel.y*this.restitution*Time.dts);
        this.gameObject.t._pos.x+=xoffs;
        this.gameObject.t._pos.y+=yoffs;
        this.isGrounded=colSide==="bottom";
        this.resetAcceleration();
        this.updateCollider();
    }

}
// import { G } from "../utils/draw";
// import { BoxCollider, Collider } from "./colliders";
// import { V2 } from "./commonObjects";
// import { Renderer } from "./renderer";
// import { Sprite } from "./sprite";
// import { Time } from "./time";

// export type BodyType="static"|"rigid";
// export class MBody{
//     static UIDs:number=1;
//     static g:number=0.5;

//     uid:number;
//     sprite:Sprite;
//     type:BodyType;
//     collider:BoxCollider;
//     acc:V2=V2.zero();
//     vel:V2=V2.zero();

//     constructor(sprite:Sprite,type:BodyType){
//         this.uid=MBody.UIDs++;
//         this.sprite=sprite;
//         this.type=type;
//         this.collider=BoxCollider.fromSprite(sprite);
//     }

//     update(){
//         if(this.type==="static")return;
//         this.acc.y+=MBody.g;
//         this.acc.y=Math.min(this.acc.y,10);
//         this.vel.x+=this.acc.x;
//         this.vel.y+=this.acc.y;
//         this.sprite.t.pos.x+=this.vel.x*Time.dts;
//         this.sprite.t.pos.y+=this.vel.y*Time.dts;
//         this.updateCollider();
//     }

//     updateCollider(){
//         this.collider.setFromSprite(this.sprite);
//     }

//     renderCollider(renderer:Renderer){
//         G.rect(renderer.ctx,this.collider.rect.x,this.collider.rect.y,this.collider.rect.w,this.collider.rect.h,{strokeColor:"green",lineWidth:2});
//     }

// }
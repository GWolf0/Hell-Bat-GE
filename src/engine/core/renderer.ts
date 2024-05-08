import { G } from "../utils/draw";
import { AniFrame } from "./animations";
import { BoxCollider } from "./colliders";
import { Line } from "./commonObjects";
import { Scene } from "./scene";
import { Sprite } from "./sprite";
import { WindowManager } from "./windowManager";

export class Renderer{
    static CLEAR_COLOR:string="#000";
    static renderColliders:boolean=true;
    static can:HTMLCanvasElement;
    static ctx:CanvasRenderingContext2D;

    static init(){
        Renderer.can=WindowManager.can;
        Renderer.ctx=Renderer.can.getContext("2d")!;
        Renderer.ctx.imageSmoothingEnabled=false;
    }

    static clearScreen(){
        Renderer.ctx.fillStyle=Renderer.CLEAR_COLOR;
        Renderer.ctx.fillRect(0,0,WindowManager.width,WindowManager.height);
    }

    static renderSprite(sprite:Sprite){
        if(sprite.img){
            if(sprite.animator&&sprite.animator.animation){
                const frame:AniFrame=sprite.animator.animation.frame;
                G.img(Renderer.ctx,sprite.t.pos.x,sprite.t.pos.y,sprite.t.scl.x,sprite.t.scl.y,sprite.img,{
                    sx:frame.x, sy:frame.y, sw:frame.w, sh:frame.h, rot:sprite.t.rot,flipHoriz:sprite.flipHorizontaly,
                });
            }else{
                G.img(Renderer.ctx,sprite.t.pos.x,sprite.t.pos.y,sprite.t.scl.x,sprite.t.scl.y,sprite.img,{
                    rot:sprite.t.rot,flipHoriz:sprite.flipHorizontaly,
                });
            }
        }else{
            G.rect(Renderer.ctx,sprite.t.pos.x,sprite.t.pos.y,sprite.t.scl.x,sprite.t.scl.y,{fillColor:"#eee"});
        }
        // Below line is commented because colliders are now rendered from the Collider Component
        // if(Renderer.renderColliders&&sprite.body)sprite.body.renderCollider();
    }
    static renderCollider(collider:BoxCollider){
        G.rect(Renderer.ctx,collider.rect.x,collider.rect.y,collider.rect.w,collider.rect.h,{strokeColor:"green",lineWidth:2});
        for(let i=0;i<collider.sidesLines.length;i++){
            const side:Line=collider.sidesLines[i];
            G.line(Renderer.ctx,side.x1,side.y1,side.x2,side.y2,{strokeColor:"red",lineWidth:2});
        }
    }

}
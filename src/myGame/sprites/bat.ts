import { MAnimation } from "../../engine/core/animations";
import { AssetLoader } from "../../engine/core/assetsLoader";
import { AudioPlayer } from "../../engine/core/audioPlayer";
import { V2 } from "../../engine/core/commonObjects";
import { BodyComp } from "../../engine/core/components/bodyComp";
import { TransformComp } from "../../engine/core/components/transformComp";
import { InputService } from "../../engine/core/inputService";
import { Sprite } from "../../engine/core/sprite";
import { WindowManager } from "../../engine/core/windowManager";
import { DEG_TO_RAD } from "../../engine/utils/math";
import { MyGame } from "../myGame";
import { GameScene } from "../scenes/gameScene";
import { Spike } from "./spikes";

export class Bat extends Sprite{
    static initialSpawnPos:V2;
    static BatSize:number=64;
    static xflapForce:number=2000;
    static yflapForce:number=250;

    isInHomeScreen:boolean;

    constructor(isInHomeScreen:boolean=false){
        Bat.initialSpawnPos=new V2(WindowManager.width*0.5-Bat.BatSize*0.5,WindowManager.height*0.5-Bat.BatSize*0.5);
        super("Bat",new TransformComp(V2.from(Bat.initialSpawnPos),0,new V2(Bat.BatSize,Bat.BatSize)),"bat","rigid");
        this.isInHomeScreen=isInHomeScreen;
        if(!this.isInHomeScreen){
            this.body.onCollisionEnter=(body:BodyComp)=>{
                // console.log(`Collided with ${body.uid}`);
                if(body.type!=="trigger"){
                    if(body.gameObject?.name.startsWith("spike")||body.gameObject?.name==="Bottom Wall")MyGame.instance.onGameOver();
                }else{
                    if(body.gameObject?.name==="Spike"){
                        const spike:Spike=body.gameObject! as Spike;
                        if(!spike.scoreTooken){
                            // console.log("+score",body.gameObject?.name);
                            (MyGame.instance.curScene as GameScene).incrementScore();
                            AudioPlayer.playFX(AssetLoader.getSnd("score_notif"));
                        }
                        spike.scoreTooken=true;
                    }
                }
            }
        }
    }

    init(){
        super.init();
    }
    setupAnimations(){
        this.animations=MAnimation.manyFromSpriteSheet(48/3,16/1,1,[3],[true],[300]);
        // const anim1:MAnimation=MAnimation.oneFromSpriteSheet(48/3,16/1,3,0,true,300);
        // this.animations.push(anim1);
        this.animator.setAnimation(this.animations[0]);
    }

    update(){
        if(!this.isInHomeScreen)this.updateMovement();
        super.update();
    }

    updateMovement(){
        if(InputService.isMouseButtonDown()||InputService.isKeyUp(" ")){
            this.flap();
        }
    }

    flap(){
        const xVel:number=((InputService.mousePos.x-this.t.pos.x)/WindowManager.width);
        this.body.setVelocity(Bat.xflapForce*xVel,-Bat.yflapForce);
        this.flipHorizontaly=xVel>0;
        AudioPlayer.playFX(AssetLoader.getSnd("coin_jump"));
        // this.t.rot=DEG_TO_RAD*xVel*75*(this.flipHorizontaly?1:-1);
    }

}
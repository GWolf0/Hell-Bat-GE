import { MAnimation } from "../animations";
import { GameObject } from "../gameObject";
import { Time } from "../time";
import { Comp } from "./comp";

export class AnimatorComp extends Comp{
    static id:number=3;

    animation:MAnimation|null=null;
    timer:number=0;
    paused:boolean=false;

    constructor(animation:MAnimation|null=null){
        super(AnimatorComp.id,"Animator");
        this.setAnimation(animation);
    }

    setAnimation(animation:MAnimation|null){
        this.animation=animation;
        if(this.animation){
            this.animation.reset();
            this.timer=0;
        }
    }

    update(){
        if(this.paused||!this.animation||this.animation.finished)return;
        this.timer+=Time.dt;
        if(this.timer>this.animation.frameDuration){
            this.timer=0;
            const hasNextFrame:boolean=this.animation.nextFrame();
        }
    }

    pause(){
        this.paused=true;
    }
    resume(){
        this.paused=false;
    }

}
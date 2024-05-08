import { MAnimation } from "../../engine/core/animations";
import { AssetLoader } from "../../engine/core/assetsLoader";
import { V2 } from "../../engine/core/commonObjects";
import { BodyComp } from "../../engine/core/components/bodyComp";
import { TransformComp } from "../../engine/core/components/transformComp";
import { InputService } from "../../engine/core/inputService";
import { Sprite } from "../../engine/core/sprite";
import { WindowManager } from "../../engine/core/windowManager";
import { DEG_TO_RAD } from "../../engine/utils/math";

export class BG extends Sprite{

    constructor(){
        super("bg",new TransformComp(V2.zero(),0,new V2(WindowManager.width,WindowManager.height)),"bg","none");
    }

    init(){
        super.init();
    }
    setupAnimations(){
        // const anim1:MAnimation=MAnimation.fromSpriteSheet(48/3,16/1,3,0,true,1000);
        // this.animations.push(anim1);
        // this.animator.setAnimation(this.animations[0]);
    }

    update(){
        super.update();
    }

}
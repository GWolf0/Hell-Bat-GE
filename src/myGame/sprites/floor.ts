import { MAnimation } from "../../engine/core/animations";
import { AssetLoader } from "../../engine/core/assetsLoader";
import { TransformComp } from "../../engine/core/components/transformComp";
import { Sprite } from "../../engine/core/sprite";

export class Floor extends Sprite{

    constructor(t:TransformComp){
        super("Floor",t,null,"static");
    }

    init(){
        super.init();
    }

}
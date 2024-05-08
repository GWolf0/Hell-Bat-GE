import { G } from "../utils/draw";
import { AniFrame, MAnimation } from "./animations";
import { AssetLoader } from "./assetsLoader";
import { BoxCollider } from "./colliders";
import { AnimatorComp } from "./components/animatorComp";
import { BodyComp, BodyType } from "./components/bodyComp";
import { ColliderComp } from "./components/colliderComp";
import { TransformComp } from "./components/transformComp";
import { GameObject } from "./gameObject";
import { PhysicsManager } from "./physicsManager";
import { Renderer } from "./renderer";

export class Sprite extends GameObject{
    imgName:string|null;
    img:HTMLImageElement|null=null;
    animations:MAnimation[]=[];
    flipHorizontaly:boolean=false;

    get collider():ColliderComp{return super.collider!;}
    get body():BodyComp{return super.body!;}
    get animator():AnimatorComp{return super.animator!;}

    constructor(name:string,t:TransformComp,imgName:string|null,bodyType:BodyType="static"){
        super(name);
        this.imgName=imgName;
        this.t.setFrom(t);
        if(bodyType!=="none"){
            this.addComponent(new ColliderComp(BoxCollider.fromGameObject(this)));
            this.addComponent(new BodyComp(bodyType,this.collider.collider));
        }
        this.addComponent(new AnimatorComp());
    }

    init(){
        this.setImage(this.imgName);
        this.setupAnimations();
    }

    // to override
    setupAnimations():void{}

    update(){
        super.update();
        this.render();
    }

    render(){
        Renderer.renderSprite(this);
    }

    setImage(imgName:string|null){
        this.imgName=imgName;
        if(this.imgName)this.img=AssetLoader.getImg(this.imgName);
    }

}
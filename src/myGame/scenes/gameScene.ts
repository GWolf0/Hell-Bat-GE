import { BoxCollider } from "../../engine/core/colliders";
import { V2 } from "../../engine/core/commonObjects";
import { BodyComp } from "../../engine/core/components/bodyComp";
import { ColliderComp } from "../../engine/core/components/colliderComp";
import { GameObject } from "../../engine/core/gameObject";
import { Scene } from "../../engine/core/scene";
import { Sprite } from "../../engine/core/sprite";
import { WindowManager } from "../../engine/core/windowManager";
import { SpikeSpawner } from "../misc/spikesSpawner";
import { Bat } from "../sprites/bat";
import { BG } from "../sprites/bg";
import { GameSceneUIManager } from "../uiManagers/gameSceneUIManager";

export class GameScene extends Scene{
    static DELAY:number=500;

    bg!:BG;
    spikeSpawner!:SpikeSpawner;
    bat!:Sprite;
    leftWall!:GameObject; rightWall!:GameObject; bottomWall!:GameObject;

    delayTimer:number=GameScene.DELAY;
    started:boolean=false;
    score:number=0;

    constructor(){
        super("Game Scene");
    }

    init(){
        this.score=0;
        GameSceneUIManager.init(this,1);
        GameSceneUIManager.setPlayState();
        this.bg=new BG();
        this.spikeSpawner=new SpikeSpawner();
        this.bat=new Bat();
        // this.bat.body.active=false;
        this.leftWall=GameObject.withBodyAndCollider("Left Wall",new V2(0,0),"static",new ColliderComp(new BoxCollider(V2.zero(),new V2(0,0),new V2(10,WindowManager.height))));
        this.rightWall=GameObject.withBodyAndCollider("Right Wall",new V2(0,0),"static",new ColliderComp(new BoxCollider(V2.zero(),new V2(WindowManager.width-10,0),new V2(10,WindowManager.height))));
        this.bottomWall=GameObject.withBodyAndCollider("Bottom Wall",new V2(0,0),"static",new ColliderComp(new BoxCollider(V2.zero(),new V2(0,WindowManager.height-10),new V2(WindowManager.width,10))));
        this.addGameObject(this.bg);
        this.addGameObject(this.bat);
        this.addGameObject(this.spikeSpawner);
        this.addGameObject(this.leftWall);
        this.addGameObject(this.rightWall);
        this.addGameObject(this.bottomWall);
        super.init();
    }

    update(){
        // if(!this.started){
        //     this.delayTimer-=Time.dt;
        //     if(this.delayTimer<=0){
        //         this.started=true;
        //         this.bat.body.active=true;
        //     }
        // }
        super.update();
    }

    incrementScore(){
        this.score++;
        GameSceneUIManager.uis["score_label"].innerText=`SCORE: ${this.score}`;
    }

}
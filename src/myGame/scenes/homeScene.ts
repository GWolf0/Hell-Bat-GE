import { AssetLoader } from "../../engine/core/assetsLoader";
import { AudioPlayer } from "../../engine/core/audioPlayer";
import { V2 } from "../../engine/core/commonObjects";
import { TransformComp } from "../../engine/core/components/transformComp";
import { Game } from "../../engine/core/game";
import { InputService } from "../../engine/core/inputService";
import { PhysicsManager } from "../../engine/core/physicsManager";
import { Scene } from "../../engine/core/scene";
import { Sprite } from "../../engine/core/sprite";
import { WindowManager } from "../../engine/core/windowManager";
import { SpikeSpawner } from "../misc/spikesSpawner";
import { MyGame } from "../myGame";
import { Bat } from "../sprites/bat";
import { BG } from "../sprites/bg";
import { Floor } from "../sprites/floor";
import { Spike } from "../sprites/spikes";
import { GameSceneUIManager } from "../uiManagers/gameSceneUIManager";
import { HomeSceneUIManager } from "../uiManagers/homeSceneUIManager";

export class HomeScene extends Scene{
    bg!:BG;
    bat!:Sprite;

    constructor(){
        super("Home Scene");
    }

    init(){
        HomeSceneUIManager.init(this,0);
        this.bg=new BG();
        this.bat=new Bat(true);
        this.bat.body.gravityScale=0;
        this.addGameObject(this.bg);
        this.addGameObject(this.bat);
        super.init();
    }

    update(){
        this.checkInputs();
        super.update();
    }

    checkInputs(){
        if(InputService.isKeyUp(" ")){
            this.onPlay();
        }
    }

    onPlay(){
        AudioPlayer.playMusic(AssetLoader.getSnd("bg_music"),true);
        MyGame.instance.setCurScene(1);
    }

}
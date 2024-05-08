import { AssetLoader } from "../engine/core/assetsLoader";
import { AudioPlayer } from "../engine/core/audioPlayer";
import { Game } from "../engine/core/game"
import { Scene } from "../engine/core/scene";
import { GameScene } from "./scenes/gameScene";
import { HomeScene } from "./scenes/homeScene";
import { GameSceneUIManager } from "./uiManagers/gameSceneUIManager";

export class MyGame extends Game{
    static instance:MyGame;

    constructor(){
        super({
            scenesCount:2,
            aspectRatio:16/9,
            showFPS:true,
            imagesAssetsFileNames:["bat.png","bg.png","platform.png"],
            soundsAssetsFileNames:["bg_music.mp3","coin_jump.wav","hit.wav","score_notif.wav"],
        });
        MyGame.instance=this;
    }

    init(){
        AudioPlayer.init(0.05,0.25);
        super.init([new HomeScene(),new GameScene()]);
    }

    onGameOver(){
        AudioPlayer.playFX(AssetLoader.getSnd("hit"));
        this.pause();
        GameSceneUIManager.setGameOverState();
    }

    onReset(){
        this.curScene?.removeGameObjects(this.curScene.gameObjects);
        this.curScene?.init();
        this.resume();
    }

}
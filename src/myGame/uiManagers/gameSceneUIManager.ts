import { UIManager } from "../../engine/core/uiManager";
import { MyGame } from "../myGame";
import { GameScene } from "../scenes/gameScene";

export class GameSceneUIManager{
    static scene:GameScene;
    static uis:{[key:string]:HTMLElement};

    static init(scene:GameScene,sceneIdx:number){
        GameSceneUIManager.scene=scene;
        GameSceneUIManager.uis=UIManager.scenes[sceneIdx];
        GameSceneUIManager.bindListeners();
    }

    static bindListeners(){
        GameSceneUIManager.uis["retry_btn"].onclick=()=>MyGame.instance.onReset();
    }

    // Update ui state play/gameover
    static setPlayState(){
        GameSceneUIManager.uis["score_label"].style.visibility="visible";
        GameSceneUIManager.uis["retry_btn"].style.visibility="hidden";
    }
    static setGameOverState(){
        GameSceneUIManager.uis["score_label"].style.visibility="visible";
        GameSceneUIManager.uis["retry_btn"].style.visibility="visible";
    }

}
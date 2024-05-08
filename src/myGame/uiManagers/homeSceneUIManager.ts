import { UIManager } from "../../engine/core/uiManager";
import { HomeScene } from "../scenes/homeScene";

export class HomeSceneUIManager{
    static scene:HomeScene;
    static uis:{[key:string]:HTMLElement};

    static init(scene:HomeScene,sceneIdx:number){
        HomeSceneUIManager.scene=scene;
        HomeSceneUIManager.uis=UIManager.scenes[sceneIdx];
        HomeSceneUIManager.bindListeners();
    }

    static bindListeners(){
        HomeSceneUIManager.uis["play_btn"].onclick=()=>HomeSceneUIManager.scene.onPlay();
    }

}
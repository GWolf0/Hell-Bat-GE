import { G } from "../utils/draw";
import { AssetLoader } from "./assetsLoader";
import { InputService } from "./inputService";
import { PhysicsManager } from "./physicsManager";
import { Renderer } from "./renderer";
import { Scene } from "./scene";
import { Time } from "./time";
import { UIManager } from "./uiManager";
import { WindowManager } from "./windowManager";

export interface GameConfigDef{
    aspectRatio?:number,
    imagesAssetsFileNames?:string[],
    soundsAssetsFileNames?:string[],
    initialSceneIdx?:number,
    scenesCount:number,
    showFPS?:boolean
}
export class Game{
    config:GameConfigDef;
    scenes:Scene[]=[];
    curSceneIdx:number=-1;
    paused:boolean=false;

    get curScene():Scene|null{return this.curSceneIdx>-1?this.scenes[this.curSceneIdx]:null;}
    get width():number{return WindowManager.width;}
    get height():number{return WindowManager.height;}

    constructor(config:GameConfigDef){
        config.aspectRatio=config.aspectRatio||9/16;
        config.imagesAssetsFileNames=config.imagesAssetsFileNames||[];
        config.soundsAssetsFileNames=config.soundsAssetsFileNames||[];
        config.initialSceneIdx=config.initialSceneIdx||0;
        this.config=config;
        WindowManager.init(config.aspectRatio);
        UIManager.init(config.scenesCount);
        Renderer.init();
        AssetLoader.init(config.imagesAssetsFileNames,config.soundsAssetsFileNames);
        AssetLoader.onLoaded=()=>{
            this.setCurScene(config.initialSceneIdx!);
            UIManager.uiContainer.style.display="block";
        }
    }

    init(scenes:Scene[]){
        PhysicsManager.init();
        this.scenes=scenes;
        Time.init();
        InputService.init();
    }

    setCurScene(sceneIdx:number){
        if(this.curScene){
            this.curScene.removeGameObjects(this.curScene.gameObjects);
        }
        this.curSceneIdx=sceneIdx;
        if(this.curScene)this.curScene.init();
        UIManager.showSceneUI(sceneIdx);
        Scene.curScene=this.curScene;
    }

    run(){
        this.update();
        requestAnimationFrame(()=>this.run());
    }

    update(){
        Time.update();
        if(!AssetLoader.loaded)return this.renderLoadingScreen();
        if(!this.curScene||this.paused)return;
        PhysicsManager.update();
        Renderer.clearScreen();
        Renderer.ctx.save();
        Renderer.ctx.translate(-this.curScene.camera.t.pos.x,-this.curScene.camera.t.pos.y);
        this.curScene.update();
        Renderer.ctx.restore();
        PhysicsManager.update();
        InputService.lateUpdate();
        if(this.config.showFPS)G.text(Renderer.ctx,10,10,`FPS: ${Time.fps}`,{fillColor:"yellow",fontSize:12});
    }

    renderLoadingScreen(){
        const loadingProgress:number=AssetLoader.getLoadingProgress()*100;
        Renderer.clearScreen();
        Renderer.ctx.save();
        G.rect(Renderer.ctx,0,0,this.width,this.height,{fillColor:"#000"});
        G.text(Renderer.ctx,this.width*0.5,this.height*0.5,`loading..(${loadingProgress}%)`,{fillColor:"#eee",fontSize:16,textBaseline:"middle",textAlign:"center"});
        Renderer.ctx.restore();
    }

    pause(){
        this.paused=true;
    }
    resume(){
        this.paused=false;
    }

}
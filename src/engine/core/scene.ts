import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { PhysicsManager } from "./physicsManager";
import { Renderer } from "./renderer";
import { Sprite } from "./sprite";

export class Scene{
    static curScene:Scene|null;

    name:string;
    gameObjects:GameObject[];
    camera:Camera;

    constructor(name:string){
        this.name=name;
        this.gameObjects=[];
        this.camera=new Camera();
    }

    init(){
        for(let i=0;i<this.gameObjects.length;i++){
            const gameObject:GameObject=this.gameObjects[i];
            gameObject.init();
            for(let childIdx in gameObject.t.children){
                gameObject.t.children[childIdx].gameObject?.init();
            }
        }
    }

    addGameObject(gameObject:GameObject){
        gameObject.init();
        this.gameObjects.push(gameObject);
        if(gameObject.body)PhysicsManager.addBody(gameObject.body);
        for(let childIdx in gameObject.t.children){
            this.addGameObject(gameObject.t.children[childIdx].gameObject!);
        }
    }
    removeGameObject(gameObject:GameObject){
        if(gameObject.body)PhysicsManager.removeBody(gameObject.body);
        for(let childIdx in gameObject.t.children){
            this.removeGameObject(gameObject.t.children[childIdx].gameObject!);
        }
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject),1);
    }
    removeGameObjects(gameObjects:GameObject[]){
        for(let i=gameObjects.length-1;i>=0;i--){
            if(!gameObjects[i])continue; // The gameobject may have been a child of another gameObject, thus removed with its parent
            this.removeGameObject(gameObjects[i]);
        }
    }

    update(){
        for(let i=0;i<this.gameObjects.length;i++){
            const gameObject:GameObject=this.gameObjects[i];
            gameObject.update();
        }
        this.camera.update();
    }

}
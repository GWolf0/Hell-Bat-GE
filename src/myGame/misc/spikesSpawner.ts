import { V2 } from "../../engine/core/commonObjects";
import { TransformComp } from "../../engine/core/components/transformComp";
import { GameObject } from "../../engine/core/gameObject";
import { Scene } from "../../engine/core/scene";
import { Time } from "../../engine/core/time";
import { WindowManager } from "../../engine/core/windowManager";
import { getRndNum } from "../../engine/utils/math";
import { Spike } from "../sprites/spikes";

export class SpikeSpawner extends GameObject{
    static spawnInterval:number=3000;
    static maxXSpawnPosition:number=128;
    static diffMulStepInterval:number=30000;// Increase difficulty multiplier each 30 seconds by 1
    static maxDiffMul:number=3.5;// Difficulty multiplier maximum value

    elapsed:number;
    timer:number;
    spikes:Spike[];

    get diffMul():number{return Math.min(this.elapsed/SpikeSpawner.diffMulStepInterval+1,SpikeSpawner.maxDiffMul);}

    constructor(){
        super("Spikes Spawner");
        this.elapsed=0;
        this.timer=SpikeSpawner.spawnInterval;
        this.spikes=[];
    }

    update(){
        super.update();
        this.updateSpawn();
        // console.log(Math.floor(this.diffMul));
    }

    updateSpawn(){
        this.elapsed+=Time.dt;
        this.timer+=Time.dt;
        if(this.timer>SpikeSpawner.spawnInterval/this.diffMul){
            this.timer=0;
            this.spawnSpikes();
        }
    }

    spawnSpikes(){
        const rndXPos:number=getRndNum(WindowManager.width*0.5-SpikeSpawner.maxXSpawnPosition,WindowManager.width*0.5+SpikeSpawner.maxXSpawnPosition);
        const spike:Spike=new Spike(new V2(rndXPos,0),this);
        this.spikes.push(spike);
        Scene.curScene?.addGameObject(spike);
    }

}
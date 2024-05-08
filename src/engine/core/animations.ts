import { Time } from "./time";

// AniFrame
export interface AniFrame{
    x:number,y:number,w:number,h:number,
};

// MAnimation
export class MAnimation{
    frames:AniFrame[];
    loop:boolean;
    duration:number;
    frameDuration:number=0;
    curFrameIdx:number=0;
    finished:boolean=false;

    get len():number{return this.frames.length;}
    get frame():AniFrame{return this.frames[this.curFrameIdx];}

    constructor(frames:AniFrame[],duration:number,loop:boolean=false){
        this.frames=frames;
        this.loop=loop;
        this.duration=duration;
        this.frameDuration=this.duration/this.len;
        this.finished=false;
    }

    static oneFromSpriteSheet(frameWidth:number,frameHeight:number,framesCount:number,rowIdx:number,loop:boolean=false,duration:number):MAnimation{
        let frames:AniFrame[]=[];
        for(let i=0;i<framesCount;i++){
            const newFrame:AniFrame={x:i*frameWidth,y:rowIdx*frameHeight,w:frameWidth,h:frameHeight};
            frames.push(newFrame);
        }
        return new MAnimation(frames,duration,loop);
    }

    static manyFromSpriteSheet(frameWidth:number,frameHeight:number,rowsCount:number,framesCount:number[],loop:boolean[],durations:number[]):MAnimation[]{
        let animations:MAnimation[]=[];
        for(let y=0;y<rowsCount;y++){
            let frames:AniFrame[]=[];
            for(let x=0;x<framesCount[y];x++){
                const newFrame:AniFrame={x:x*frameWidth,y:y*frameHeight,w:frameWidth,h:frameHeight};
                frames.push(newFrame);
            }
            const newAnimation:MAnimation=new MAnimation(frames,durations[y],loop[y]);
            animations.push(newAnimation);
        }
        return animations;
    }

    reset(){
        this.curFrameIdx=0;
        this.finished=false;
    }

    nextFrame():boolean{
        let nextFrame:number=this.curFrameIdx+1;
        if(nextFrame===this.len){
            if(!this.loop){
                this.finished=true;
                return false;
            }else{
                nextFrame=0;
            }
        }
        this.curFrameIdx=nextFrame;
        return true;
    }

}

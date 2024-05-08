export class Time{
    static dt:number; //deltaTime in milliseconds
    static dts:number; //deltaTime in seconds
    static elapsed:number;
    static lastTime:number;
    static fps:number;

    static init(){
        Time.lastTime=new Date().valueOf();
        Time.elapsed=0;
    }

    static update(){
        const now:number=new Date().valueOf();
        Time.dt=now-Time.lastTime;
        Time.dts=Time.dt/1000;
        Time.elapsed+=Time.dt;
        Time.lastTime=now;
        Time.fps=Math.floor(1000/Time.dt);
    }

}
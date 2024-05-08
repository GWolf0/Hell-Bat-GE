export class WindowManager{
    static width:number;
    static height:number;
    static aspect:number;
    static container:HTMLElement;
    static can:HTMLCanvasElement;

    static init(aspect:number=9/16){
        WindowManager.aspect=aspect;
        WindowManager.can=document.getElementById("can")! as HTMLCanvasElement;
        WindowManager.container=WindowManager.can.parentElement!.parentElement!;
        WindowManager.resize();
        window.addEventListener("resize",()=>WindowManager.resize());
    }

    static resize(){
        const containerRect:DOMRect=WindowManager.container.getBoundingClientRect();
        if(WindowManager.aspect<=1){
            const newWidth:number=containerRect.width;
            const newHeight:number=newWidth*WindowManager.aspect;
            WindowManager.can.width=newWidth;
            WindowManager.can.height=newHeight;
        }else{
            const newHeight:number=containerRect.height;
            const newWidth:number=newHeight/WindowManager.aspect;
            WindowManager.can.width=newWidth;
            WindowManager.can.height=newHeight;
        }
        WindowManager.width=WindowManager.can.width;
        WindowManager.height=WindowManager.can.height;
    }

}
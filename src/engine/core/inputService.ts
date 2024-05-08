import { V2 } from "./commonObjects";
import { Game } from "./game";
import { WindowManager } from "./windowManager";

interface InputKeyState{isDown?:boolean,isUp?:boolean}

export class InputService{
    static keys:{[key:string]:InputKeyState}={
        " ":{},
        "ArrowLeft":{},
        "ArrowUp":{},
        "ArrowRight":{},
        "ArrowDown":{},
    }
    static keysAliases:string[]=Object.keys(InputService.keys);

    static mouseDown:boolean=false;
    static mouseUp:boolean=false;
    static mousePos:V2=V2.zero();

    static init(){
        window.addEventListener('mousemove',(e:MouseEvent)=>{
            const canvas:HTMLElement=WindowManager.can;
            if(canvas){
                const bb:DOMRect=canvas.getBoundingClientRect();
                InputService.mousePos.set(e.clientX-bb.left,e.clientY-bb.top);
            }
        });
        window.addEventListener('pointermove',(e:MouseEvent)=>{
            const canvas:HTMLElement=WindowManager.can;
            if(canvas){
                const bb:DOMRect=canvas.getBoundingClientRect();
                InputService.mousePos.set(e.clientX-bb.left,e.clientY-bb.top);
            }
        });
        window.addEventListener('mousedown',()=>{
            InputService.mouseUp=false;
            InputService.mouseDown=true;
        });
        window.addEventListener('mouseup',()=>{
            InputService.mouseDown=false;
            InputService.mouseUp=true;
        });
        window.addEventListener('pointerdown',()=>{
            InputService.mouseUp=false;
            InputService.mouseDown=true;
        })
        window.addEventListener('pointerup',()=>{
            InputService.mouseDown=false;
            InputService.mouseUp=true;
        });
        window.addEventListener('keydown',(e:KeyboardEvent)=>{
            const key:string=e.key;
            if(InputService.keysAliases.includes(key)){
                InputService.keys[key].isDown=true;
                InputService.keys[key].isUp=false;
            }
        });
        window.addEventListener('keyup',(e:KeyboardEvent)=>{
            const key:string=e.key;
            //console.log(key,InputService.keysAliases.includes(key));
            if(InputService.keysAliases.includes(key)){
                InputService.keys[key].isDown=false;
                InputService.keys[key].isUp=true;
            }
        });
    }

    static preUpdate(){

    }

    static lateUpdate(){
        InputService.mouseDown=false;
        InputService.mouseUp=false;
        for(let i=0;i<InputService.keysAliases.length;i++){
            const alias:string=InputService.keysAliases[i];
            // InputService.keys[alias].isDown=false;
            InputService.keys[alias].isUp=false;
        }
    }

    // Mouse inputs
    static isMouseButtonDown():boolean{
        return InputService.mouseDown;
    }
    static isMouseButtonUp():boolean{
        return InputService.mouseUp;
    }

    // Keyboard inputs
    static isKeyDown(keyAlias:string):boolean{
        return InputService.keysAliases.includes(keyAlias)&&InputService.keys[keyAlias].isDown===true;
    }
    static isKeyUp(keyAlias:string):boolean{
        return InputService.keysAliases.includes(keyAlias)&&InputService.keys[keyAlias].isUp===true;
    }

}
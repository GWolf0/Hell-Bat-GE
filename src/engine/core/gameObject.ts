// @ts-nocheck
// no check for line 43 at function addComponent(comp:Comp): this.comps[comp.id]=comp; 
import { V2 } from "./commonObjects";
import { AnimatorComp } from "./components/animatorComp";
import { BodyComp, BodyType } from "./components/bodyComp";
import { ColliderComp } from "./components/colliderComp";
import { Comp } from "./components/comp";
import { TransformComp } from "./components/transformComp";

export class GameObject{
    static UIDs:number=1;

    uid:number;
    name:string;
    comps:[
        transform:TransformComp,
        collider:ColliderComp|null,
        body:BodyComp|null,
        animator:AnimatorComp|null,
    ];

    get t():TransformComp{return this.comps[TransformComp.id] as TransformComp;}
    get collider():ColliderComp|null{return this.comps[ColliderComp.id] as ColliderComp;}
    get body():BodyComp|null{return this.comps[BodyComp.id] as BodyComp;}
    get animator():AnimatorComp|null{return this.comps[AnimatorComp.id] as AnimatorComp;}

    constructor(name:string){
        this.uid=GameObject.UIDs++;
        this.name=name;
        const transformComp=new TransformComp();
        transformComp.setGameObject(this);
        this.comps=[transformComp,null,null,null];
    }
    static withBodyAndCollider(name:string,pos:V2,bodyType:BodyType,collider:ColliderComp):GameObject{
        const go:GameObject=new GameObject(name);
        go.t._pos=pos;
        go.addComponent(collider);
        go.addComponent(new BodyComp(bodyType,collider.collider));
        return go;
    }

    addComponent(comp:Comp){
        this.comps[comp.id]=comp;
        comp.setGameObject(this);
    }

    init(){}

    update(){
        for(let i=0;i<this.comps.length;i++){
            this.comps[i]?.masterUpdate();
        }
    }

}
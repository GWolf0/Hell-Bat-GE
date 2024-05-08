import { checkAABBCollision, checkCollisionSide } from "../utils/math";
import { BodyComp } from "./components/bodyComp";

export type CollisionSide="none"|"left"|"top"|"right"|"bottom";
export class PhysicsManager{
    static G:number=0.5; // Gravity

    static bodies:BodyComp[];
    static collidedPairs:[b1:BodyComp,b2:BodyComp][];
    static newCollidedPairs:[b1:BodyComp,b2:BodyComp][];

    static init(){
        PhysicsManager.bodies=[];
        PhysicsManager.collidedPairs=[];
        PhysicsManager.newCollidedPairs=[];
    }

    static addBody(body:BodyComp){PhysicsManager.bodies.push(body);}
    static removeBody(body:BodyComp){PhysicsManager.bodies.splice(PhysicsManager.bodies.indexOf(body),1);}

    static update(){
        // Clear the newCollidedPairs Array
        PhysicsManager.newCollidedPairs.length=0;
        // Update bodies and check collisions
        for(let i=0;i<PhysicsManager.bodies.length;i++){
            const b:BodyComp=PhysicsManager.bodies[i];
            if(!b.active||!b.collider)continue;
            b.updateMovement();
            if(b.type==="rigid"){
                PhysicsManager.checkCollisions(b);
            }
        }
        // Check pair that are no longer colliding
        for(let i=PhysicsManager.collidedPairs.length-1;i>=0;i--){
            const pair:[b1:BodyComp,b2:BodyComp]=PhysicsManager.collidedPairs[i];
            if(!PhysicsManager.isPairInCollection(pair,PhysicsManager.newCollidedPairs)){
                PhysicsManager.collidedPairs.splice(i,1);
            }
        }
    }

    static checkCollisions(body:BodyComp){
        for(let i=0;i<PhysicsManager.bodies.length;i++){
            const body2:BodyComp=PhysicsManager.bodies[i];
            if(body.uid===body2.uid)continue;
            if(checkAABBCollision(body.collider!,body2.collider!)){
                const pair:[b1:BodyComp,b2:BodyComp]=[body,body2];
                if(!PhysicsManager.isPairInCollection(pair,PhysicsManager.collidedPairs)){
                    PhysicsManager.collidedPairs.push(pair);
                    if(body.onCollisionEnter){
                        body.onCollisionEnter(body2);
                    }
                }
                PhysicsManager.newCollidedPairs.push([body,body2]);
                const colSide:CollisionSide=checkCollisionSide(body.collider!,body2.collider!);
                if(body2.type!=="trigger")body.reactToCollision(colSide);
            }
        }
    }

    static isPairInCollection(pair:[b1:BodyComp,b2:BodyComp],collection:[b1:BodyComp,b2:BodyComp][]):boolean{
        return collection.findIndex(([b1,b2],i)=>(b1.uid===pair[0].uid&&b2.uid===pair[1].uid) || (b1.uid===pair[1].uid&&b2.uid===pair[0].uid))>-1;
    }

}
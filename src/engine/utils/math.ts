import { BoxCollider } from "../core/colliders";
import { Line, Rect } from "../core/commonObjects";
import { CollisionSide } from "../core/physicsManager";

// Random related things
export function getRndNum(min:number,max:number):number{
    return Math.floor(Math.random()*(max-min))+min;
}

// Collision checking
export function checkAABBCollision(col1:BoxCollider,col2:BoxCollider):boolean{
    const rect1:Rect=col1.rect;
    const rect2:Rect=col2.rect;
    const xCollision:boolean=rect1.x<rect2.x+rect2.w&&rect1.x+rect1.w>rect2.x;
    const yCollision:boolean=rect1.y<rect2.y+rect2.h&&rect1.y+rect1.h>rect2.y;
    return xCollision&&yCollision;
}

export function checkCollisionSide(col1:BoxCollider,col2:BoxCollider):CollisionSide{
    const rect:Rect=col2.rect;
    const leftSide:Line=col1.sidesLines[0];
    if(lineInRect(leftSide.x1,leftSide.y1,leftSide.x2,leftSide.y2,rect))return "left";
    const topSide:Line=col1.sidesLines[1];
    if(lineInRect(topSide.x1,topSide.y1,topSide.x2,topSide.y2,rect))return "top";
    const rightSide:Line=col1.sidesLines[2];
    if(lineInRect(rightSide.x1,rightSide.y1,rightSide.x2,rightSide.y2,rect))return "right";
    const bottomSide:Line=col1.sidesLines[3];
    if(lineInRect(bottomSide.x1,bottomSide.y1,bottomSide.x2,bottomSide.y2,rect))return "bottom";
    return "none";
}

export function pointInRect(px:number,py:number,rect:Rect):boolean{
    return px>rect.x&&px<rect.x+rect.w && py>rect.y&&py<rect.y+rect.h;
}

export function lineInRect(px1:number,py1:number,px2:number,py2:number,rect:Rect):boolean{
    return pointInRect(px1,py1,rect) && pointInRect(px2,py2,rect);
}

// Misc
export const DEG_TO_RAD:number=Math.PI/180;
export const RAD_TO_DEG:number=180/Math.PI;

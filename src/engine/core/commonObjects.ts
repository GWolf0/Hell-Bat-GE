//V2
export class V2{
    x:number; y:number;

    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    set(x:number,y:number){this.x=x;this.y=y;}
    
    static from(v:V2){return new V2(v.x,v.y);}

    static zero():V2{return new V2(0,0)};
    static one(scl:number=1):V2{return new V2(1*scl,1*scl)};
    static left():V2{return new V2(-1,0)};
    static top():V2{return new V2(0,-1)};
    static right():V2{return new V2(1,0)};
    static down():V2{return new V2(0,1)};

    static add(v1:V2,v2:V2):V2{return new V2(v1.x+v2.x,v1.y+v2.y);}
    static sub(v1:V2,v2:V2):V2{return new V2(v1.x-v2.x,v1.y-v2.y);}
    static mul(v1:V2,s:number):V2{return new V2(v1.x*s,v1.y*s);}
    static div(v1:V2,s:number):V2{return new V2(v1.x/s,v1.y/s);}

    // Dot product
    static dot(v1:V2,v2:V2):number{return v1.x*v2.x+v1.y*v2.y;}
    // Length
    static len(v:V2):number{return Math.sqrt(V2.dot(v,v));}
    // Distance
    static dist(v1:V2,v2:V2):number{return V2.len(V2.sub(v1,v2));}
    // Normal
    static normal(v:V2):V2{return V2.div(v,V2.len(v));}
    // Interpolate
    static lerp(v1:V2,v2:V2,s:number):V2{
        const invS=1-s;
        return new V2(v1.x*invS+v2.x*s, v1.y*invS+v2.y*s);
    }

}

// Line
export class Line{
    x1:number; y1:number; x2:number; y2:number;
    constructor(x1:number,y1:number,x2:number,y2:number){
        this.x1=x1;this.y1=y1;
        this.x2=x2;this.y2=y2;
    }
    static zero():Line{return new Line(0,0,0,0);}
    static fromV2(v1:V2,v2:V2):Line{
        return new Line(v1.x,v1.y,v2.x,v2.y);
    }

}

// Rect
export class Rect{
    x:number; y:number; w:number; h:number;
    constructor(x:number, y:number, w:number, h:number){this.x=x;this.y=y;this.w=w;this.h=h;}
    static zero():Rect{return new Rect(0,0,0,0);}
    static one(s:number=1):Rect{return new Rect(1*s,1*s,1*s,1*s);}
    get rect2():Rect{return new Rect(this.x,this.y,this.x+this.w,this.y+this.h);}
    set(x:number,y:number,w:number,h:number){this.x=x;this.y=y;this.w=w;this.h=h;}
}

//Transform
// export class Transform{
//     pos:V2; rot:number; scl:V2;

//     constructor(pos:V2=V2.zero(),rot:number=0,scl:V2=V2.one()){
//         this.pos=pos;
//         this.rot=rot;
//         this.scl=scl;
//     }

// }

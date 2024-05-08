export interface DrawOptions{
    rot?:number, opacity?:number, fillColor?:string, strokeColor?:string, lineWidth?:number, flipHoriz?:boolean,
};
export interface ImageDrawOptions extends DrawOptions{
    sx?:number, sy?:number, sw?:number, sh?:number
};
export interface TextDrawOptions extends DrawOptions{
    fontSize?:number,textBaseline?:CanvasTextBaseline,textAlign?:CanvasTextAlign,
};
export class G{

    static img(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,image:HTMLImageElement,options:ImageDrawOptions){
        options.rot=options.rot||0;
        options.opacity=options.opacity||1;
        options.fillColor=options.fillColor||"";
        options.strokeColor=options.strokeColor||"";
        options.sx=options.sx||0;
        options.sy=options.sy||0;
        options.sw=options.sw||image.width;
        options.sh=options.sh||image.height;
        ctx.save();
        ctx.globalAlpha=options.opacity;
        if(options.flipHoriz){// Flip horizontally/vertically requires scaling negatively from the center of the image rect
            ctx.translate(x+w*0.5,y+h*0.5);
            ctx.scale(-1,1);
            ctx.translate(-w*0.5,-h*0.5);
        }else{
            ctx.translate(x,y);
        }
        ctx.rotate(options.rot);
        ctx.drawImage(image,options.sx,options.sy,options.sw,options.sh,options.fillColor?-w*0.5:0,options.fillColor?-h*0.5:0,w,h);
        ctx.restore();
    }

    static rect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,options:DrawOptions){
        options.rot=options.rot||0;
        options.opacity=options.opacity||1;
        options.fillColor=options.fillColor||"";
        options.strokeColor=options.strokeColor||"";
        options.lineWidth=options.lineWidth||1;
        ctx.save();
        ctx.lineWidth=options.lineWidth;
        ctx.globalAlpha=options.opacity;
        ctx.fillStyle=options.fillColor;
        ctx.strokeStyle=options.strokeColor;
        ctx.translate(x,y);
        ctx.rotate(options.rot);
        // ctx.scale(xscl,yscl);
        if(options.fillColor)ctx.fillRect(0,0,w,h);
        if(options.strokeColor)ctx.strokeRect(0,0,w,h);
        ctx.restore();
    }

    static arc(ctx:CanvasRenderingContext2D,x:number,y:number,r:number,options:DrawOptions,from:number=0,to:number=Math.PI*2){
        options.rot=options.rot||0;
        options.opacity=options.opacity||1;
        options.fillColor=options.fillColor||"";
        options.strokeColor=options.strokeColor||"";
        options.lineWidth=options.lineWidth||1;
        ctx.save();
        ctx.lineWidth=options.lineWidth;
        ctx.globalAlpha=options.opacity;
        ctx.fillStyle=options.fillColor;
        ctx.strokeStyle=options.strokeColor;
        ctx.translate(x,y);
        ctx.rotate(options.rot);
        // ctx.scale(xscl,yscl);
        ctx.beginPath();
        ctx.arc(0,0,r,from,to);
        if(options.fillColor)ctx.fill();
        if(options.strokeColor)ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    static line(ctx:CanvasRenderingContext2D,x1:number,y1:number,x2:number,y2:number,options:DrawOptions){
        options.rot=options.rot||0;
        options.opacity=options.opacity||1;
        options.fillColor=options.fillColor||"";
        options.strokeColor=options.strokeColor||"";
        options.lineWidth=options.lineWidth||1;
        ctx.save();
        ctx.lineWidth=options.lineWidth;
        ctx.globalAlpha=options.opacity;
        ctx.fillStyle=options.fillColor;
        ctx.strokeStyle=options.strokeColor;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        if(options.fillColor)ctx.fill();
        if(options.strokeColor)ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    static dot(ctx:CanvasRenderingContext2D,x:number,y:number,size:number,options:DrawOptions){
        G.arc(ctx,x,y,size*0.5,options);
    }

    static text(ctx:CanvasRenderingContext2D,x:number,y:number,txt:string,options:TextDrawOptions){
        options.rot=options.rot||0;
        options.opacity=options.opacity||1;
        options.fillColor=options.fillColor||"";
        options.strokeColor=options.strokeColor||"";
        options.lineWidth=options.lineWidth||1;
        options.fontSize=options.fontSize||16;
        options.textBaseline=options.textBaseline||"middle";
        options.textAlign=options.textAlign||"start";
        ctx.save();
        ctx.lineWidth=options.lineWidth;
        ctx.globalAlpha=options.opacity;
        ctx.fillStyle=options.fillColor;
        ctx.strokeStyle=options.strokeColor;
        ctx.font=`${options.fontSize}px Arial`;
        ctx.textBaseline=options.textBaseline;
        ctx.textAlign=options.textAlign;
        if(options.fillColor)ctx.fillText(txt,x,y);
        if(options.strokeColor)ctx.strokeText(txt,x,y);
        ctx.restore();
    }

}
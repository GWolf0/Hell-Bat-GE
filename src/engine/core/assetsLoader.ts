export class AssetLoader{
    static DEFAULT_IMGS_ROOT_DIR:string="./assets/game/imgs/";
    static DEFAULT_SNDS_ROOT_DIR:string="./assets/game/snds/";

    static imgsRootDir:string;
    static sndsRootDir:string;
    static loadedImgAssetsCount:number=0;
    static loadedSndAssetsCount:number=0;
    static totalAssetsCount:number=0;
    static imagesAssetsCount:number=0;
    static imgs:{[key:string]:HTMLImageElement}={};
    static soundsAssetsCount:number=0;
    static snds:{[key:string]:HTMLAudioElement}={};
    static loaded:boolean=false;
    static additionalWaitTime:number=1000;
    static onLoaded:(()=>any)|null=null;

    static getImg(imgTag:string):HTMLImageElement{return AssetLoader.imgs[imgTag];}
    static getSnd(sndTag:string):HTMLAudioElement{return AssetLoader.snds[sndTag];}
    static getLoadingProgress():number{return (AssetLoader.loadedImgAssetsCount+AssetLoader.loadedSndAssetsCount)/AssetLoader.totalAssetsCount;}

    static async init(imgsFileNames:string[],sndsFileNames:string[],imgsRootDir:string=AssetLoader.DEFAULT_IMGS_ROOT_DIR,sndsRootDir:string=AssetLoader.DEFAULT_SNDS_ROOT_DIR){
        AssetLoader.imgsRootDir=imgsRootDir;
        AssetLoader.sndsRootDir=sndsRootDir;
        await AssetLoader.loadImages(imgsFileNames);
        await AssetLoader.loadSounds(sndsFileNames);
        await new Promise((resolve)=>setTimeout(resolve,AssetLoader.additionalWaitTime));
        AssetLoader.loaded=true;
        if(AssetLoader.onLoaded)AssetLoader.onLoaded();
    }

    static async loadImages(imgsFileNames:string[]):Promise<boolean>{
        AssetLoader.imagesAssetsCount=imgsFileNames.length;
        AssetLoader.totalAssetsCount+=AssetLoader.imagesAssetsCount;
        if(AssetLoader.imagesAssetsCount===0)return true;
        return new Promise((resolve,reject)=>{
            for(let i=0;i<AssetLoader.imagesAssetsCount;i++){
                const imgFileName:string=imgsFileNames[i];
                const newImage:HTMLImageElement=new Image();
                newImage.src=`${AssetLoader.imgsRootDir}${imgFileName}`;
                newImage.onerror=()=>{
                    console.log("Error loading asset image "+newImage.src);
                    reject("Error loading asset image "+newImage.src);
                }
                newImage.onload=()=>{
                    AssetLoader.loadedImgAssetsCount++;
                    const fileNameWithoutExt:string=imgFileName.split(".")[0];
                    AssetLoader.imgs[fileNameWithoutExt]=newImage;
                    if(AssetLoader.loadedImgAssetsCount===AssetLoader.imagesAssetsCount){
                        resolve(true);
                    }
                }
            }
        });
    }

    static async loadSounds(sndsFileNames:string[]):Promise<boolean>{
        AssetLoader.soundsAssetsCount=sndsFileNames.length;
        AssetLoader.totalAssetsCount+=AssetLoader.soundsAssetsCount;
        if(AssetLoader.soundsAssetsCount===0)return true;
        return new Promise((resolve,reject)=>{
            for(let i=0;i<AssetLoader.soundsAssetsCount;i++){
                const sndFileName:string=sndsFileNames[i];
                const newSound:HTMLAudioElement=new Audio();
                newSound.src=`${AssetLoader.sndsRootDir}${sndFileName}`;
                newSound.onerror=()=>{
                    console.log("Error loading asset sound "+newSound.src);
                    reject("Error loading asset sound "+newSound.src);
                }
                newSound.onloadeddata=()=>{
                    AssetLoader.loadedSndAssetsCount++;
                    const fileNameWithoutExt:string=sndFileName.split(".")[0];
                    AssetLoader.snds[fileNameWithoutExt]=newSound;
                    if(AssetLoader.loadedSndAssetsCount===AssetLoader.soundsAssetsCount){
                        resolve(true);
                    }
                }
            }
        });
    }

}
export class UIManager{
    static UI_CONTAINER_ID:string="ui-container";

    static uiContainer:HTMLElement;
    static scenes:{[key:string]:HTMLElement}[];

    static init(scenesCount:number){
        UIManager.scenes=[];
        UIManager.uiContainer=document.getElementById(UIManager.UI_CONTAINER_ID)!;
        UIManager.uiContainer.style.display="none"; // Hidden at first, then visible when assets are loaded
        for(let idx in Array(scenesCount).fill(0)){
            UIManager.scenes.push({});
            const uiSceneContainerID:string=`ui-scene-${idx}`;
            const uiSceneContainer:HTMLElement=document.getElementById(uiSceneContainerID)!;
            const uis:HTMLElement[]=Array.from(uiSceneContainer.querySelectorAll(`*[id^="g_"]`));
            UIManager.scenes[idx]["container"]=uiSceneContainer;
            for(let i=0;i<uis.length;i++){
                const uiElem:HTMLElement=uis[i];
                UIManager.scenes[idx][uiElem.id.substring(2)]=uiElem;
            }
        }
        UIManager.showSceneUI(0);
        // console.log(UIManager.scenes)
    }

    static showSceneUI(sceneIdx:number){
        for(let i=0;i<UIManager.scenes.length;i++){
            const sceneUIContainer:HTMLElement=UIManager.scenes[i]["container"];
            sceneUIContainer.style.display=i===sceneIdx?'flex':'none';
        }
    }

}
import { AssetLoader } from './engine/core/assetsLoader';
import { Renderer } from './engine/core/renderer';
import { Scene } from './engine/core/scene'
import { MyGame } from './myGame/myGame';
import './style.css'

async function main(){
    // Renderer.renderColliders=false;
    const game:MyGame=new MyGame();
    game.init();
    game.run();
}

main();


export class AudioPlayer{
    static musicVolume:number=0.25;
    static fxVolume:number=0.5;
    static musicMuted:boolean=false;
    static fxMuted:boolean=false;

    static init(musicVolume:number=0.25,fxVolume:number=0.5,musicMuted:boolean=false,fxMuted:boolean=false){
        AudioPlayer.musicVolume=musicVolume;
        AudioPlayer.fxVolume=fxVolume;
        AudioPlayer.musicMuted=musicMuted;
        AudioPlayer.fxMuted=fxMuted;
    }

    static playMusic(audio:HTMLAudioElement,loop:boolean=false){
        if(AudioPlayer.musicMuted)return;
        audio.volume=AudioPlayer.musicVolume;
        audio.loop=loop;
        audio.play();
    }

    static playFX(audio:HTMLAudioElement,loop:boolean=false){
        if(AudioPlayer.fxMuted)return;
        audio.volume=AudioPlayer.fxVolume;
        audio.loop=loop;
        audio.play();
    }

}
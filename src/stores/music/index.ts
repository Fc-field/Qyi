import { defineStore } from "pinia"
import { reactive } from "vue";
import { data } from "@/utils";
import { lyrType } from "./type";
import { log } from "console";

const { setStoreValue, getStoreValue } = window.electronAPI.ipcRenderer;

/**
 * 将一个时间字符串解析成数字（秒）
 */
const parseTime = (timeStr: string) => {
    var parts = timeStr.split(':');
    return +parts[0] * 60 + +parts[1];
};

/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象: {time: 开始时间,words: 歌词内容}
 */
const parseLrc = (lrc: string) => {
    const lines = lrc.split('\n');
    const result = [];
    for(let i = 0;i < lines.length; i++){
        const str = lines[i];
        const parts = str.split(']');
        const timeStr = parts[0].substring(1);
        const obj = {
            time: parseTime(timeStr),
            words: parts[1]
        }
        result.push(obj);
    }
    return result;
}


//播放音乐
export const useMusicStore = defineStore("music", () => {
    const playMusic = reactive({
        musicUrl: "",
        picUrl: "",
        singer: "未知",
        name: "未知",
        time: "00:00",//时间
        dt: 0,//时长
        isPlay: false,
        lyr: <lyrType[]>[],
    });
    const setPlayMusic = (musicInfo: data, isPlay: boolean) => {//isPlay:false为刚启动程序，true为使用了功能
        playMusic.musicUrl = musicInfo.musicUrl;
        playMusic.picUrl = musicInfo.picUrl;
        playMusic.singer = musicInfo.singer;
        playMusic.name = musicInfo.name;
        playMusic.time = musicInfo.time;
        playMusic.dt = musicInfo.dt;
        playMusic.isPlay = isPlay;
        
        if (isPlay) {
            //存入数据库当前播放歌曲
            setStoreValue("currentMusic", { ...musicInfo,  isPlay: false });
        };
    };
    //添加歌词
    const setMusicSentence = (lrc: string) => {
        const lyr = parseLrc(lrc);
        setStoreValue("musicLyr", [...lyr]);
        playMusic.lyr = lyr;
    }

    return {
        playMusic,
        setPlayMusic,
        setMusicSentence
    }
})
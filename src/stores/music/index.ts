import { defineStore } from "pinia"
import { reactive } from "vue";
import { data } from "@/utils";

export const useMusicStore = defineStore("music", () => {
    const playMusic = reactive({
        musicUrl: "",
        picUrl: "",
        singer: "未知",
        name: "未知",
        time: "00:00",//时间
        dt: 0,//时长
        isPlay: false,
    })
    const setPlayMusic = (musicInfo: data) => {
        playMusic.musicUrl = musicInfo.musicUrl;
        playMusic.picUrl = musicInfo.picUrl;
        playMusic.singer = musicInfo.singer;
        playMusic.name = musicInfo.name;
        playMusic.time = musicInfo.time;
        playMusic.dt = musicInfo.dt;
        playMusic.isPlay = true;
    }
    return {
        playMusic,
        setPlayMusic
    }
})
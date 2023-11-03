import { defineStore } from "pinia";
import { data } from "@/utils";
import { reactive } from "vue";

export const useMusicList = defineStore("musiclist", () => {
    const musicList = reactive<Array<data>>([]);

    const setMusicList = (music: data) => {
        musicList.push(music);
    }

    return {
        musicList,
        setMusicList
    }
})
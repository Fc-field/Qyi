import { defineStore } from "pinia";
import { data } from "@/utils";
import { reactive } from "vue";

export const useMusicListStore = defineStore("musiclist", () => {
    const musicList = reactive<Array<data>>([]);//歌曲列表
    //添加歌曲到歌曲列表
    const addMusicList = (music: data) => {
        const index = musicList.findIndex((item)=>item.id === music.id);
        if (index !== -1) {
            musicList.splice(index  , 1);
        }
        musicList.unshift(music);

    }
    //从数据库导入歌曲列表
    const setMusicList = (list: data[]) => {
        list.map(item => {
            musicList.push(item);
        })
    }
    return {
        musicList,
        addMusicList,
        setMusicList
    }
})
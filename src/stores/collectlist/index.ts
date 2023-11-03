import { defineStore } from "pinia";
import { reactive } from "vue";
import { data } from "@/utils";


export const useCollectList = defineStore("collectlist", () => {
    const collectList = reactive<Array<data>>([]);//收藏列表
    //收藏
    const increaseMusic = (music: data) => {
        collectList.push(music);
    }

    //检测是否歌曲已被收藏
    const checkCollect = (id: string) => {
        collectList.map(item => {
            if (item.id === id) return true;
        })
        return false;
    }

    return {
        collectList,
        increaseMusic,
        checkCollect
    }
})
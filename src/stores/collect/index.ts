import { defineStore } from "pinia";
import { reactive } from "vue";
import { data } from "@/utils";


export const useCollectStore = defineStore("collect", () => {
    const collectList = reactive<Array<data>>([]);//收藏列表
    //收藏
    const increaseMusic = (music: data) => {
        collectList.push(music);
    }
    //取消收藏
    const cancleCollect = (id: string) => {
        collectList.forEach((item: data, index: number) => {
            if (item.id === id) {
                collectList.splice(index, 1);
            }
        });
    }

    //检测是否歌曲已被收藏
    const checkCollect = (id: string) => {
        let isCollect = false;
        collectList.forEach(item => {
            if (item.id === id) {
                isCollect = true;
            }
        })
        return isCollect;
    }

    return {
        collectList,
        increaseMusic,
        checkCollect,
        cancleCollect
    }
})
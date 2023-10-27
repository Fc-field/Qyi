import { defineStore } from "pinia"
import { reactive } from "vue";

export const useActionStore = defineStore("action", () => {
    const actionList = reactive([1,2,3]);

    return {
        actionList,
    };
})
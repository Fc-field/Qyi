import { get, post } from "./https";
//搜索歌曲
export const search = (param: object) => get("/cloudsearch", param);
//歌曲是否可用
export const checkSong = (param: object) => get("/check/music", param);
//获取歌曲连接
export const getMusicUrl = (param: object) => get("/song/url", param);
//获取歌词
export const getMusicSentence = (param: object) => get("/lyric", param);
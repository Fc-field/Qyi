//共用type

//搜索歌曲表单
export type data = {
    name: string,
    singer: string,
    album: string,
    time: string,  //换算分秒
    id: string, //歌曲id
    picUrl: string, //歌曲图片url,
    musicUrl: string, //歌曲url
    dt: number, //歌曲总时长
    isCollect: boolean, //是否已收藏
}

export const errorHandle = (status: number, message: string) => {
    //状态码判断
    switch (status) {
        case -460: {
            ElMessage.error(message)
        }
    }
}
import { sendProxy } from "h3";

// 代理成功 请求失败
export default defineEventHandler(async (event) => {
    const target = new URL(
        event.req.url.replace(/^\/proxy-api/, ""),
        'https://www.dvtop.cn',
    )
    console.log(target)
    return await sendProxy(event, target.toString())
})
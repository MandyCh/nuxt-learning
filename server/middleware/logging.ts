export default defineEventHandler((event)=>{
    // 显示所有服务端渲染路由请求日志
    const time = new Date().toDateString();
    console.log(`${time} request url: ${event.req.url} `);
    // 统一附加内容
    event.context.reqTime = time
})
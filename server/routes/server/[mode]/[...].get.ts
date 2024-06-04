export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const body = {}   //await readBody(event); //get方法无此数据
    const cookies = parseCookies(event)

    return {
        time: event.context.reqTime,
        params: event.context.params,
        query,
        body,
        cookies
    }
})
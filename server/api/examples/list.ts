import examples from "~/assets/data/examples";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    return await examples.find(Number(query.page))
})


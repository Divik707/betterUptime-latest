import { prisma } from "@repo/db/client";
import { xAddBulk } from "@repo/redis/client";

async function main() {
    const res = await prisma.website.findMany({
        select: {
            id: true,
            url: true
        }
    })
    // push to redis
    await xAddBulk(res.map(w => ({
        url: w.url,
        id: w.id
    })))
}

setInterval(() => {
    main()
}, (3 * 1000));
import { xAck, xReadGroup }  from "@repo/redis/client";

const workerId = process.env.WORKER_ID!;
const regionId = process.env.REGION_ID!;

if(!regionId) {
    throw new Error("region ID not set in env")
}

if(!workerId) {
    throw new Error("worker ID not set in env")
} 

async function main() {
    const res = await xReadGroup(regionId, workerId);
    
}

main()
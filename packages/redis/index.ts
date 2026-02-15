import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

  type WebsiteEvents = {url: string, id: string};

  async function xAdd({ url,  id} : WebsiteEvents) {
      client.xAdd('betteruptime:websites', '*', {

      }) 
  }

  export async function xAddBulk(websites: WebsiteEvents[]) {
    for(let i = 0; i < websites.length; i++) {
        if(websites[i]?.url && websites[i]?.id) {
            await xAdd({
                id: websites[i]!.id,
                url: websites[i]!.url
            })
        }
    }
  }

  client.destroy();
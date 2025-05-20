const {createClient} = require('redis');

const client= createClient();

client.on('error', (err)=>
{
    console.error(err);
})

async function connectRedis() {
    const connection= await client.connect();
    console.log("connected with redis server");

}



module.exports= client, {connectRedis};
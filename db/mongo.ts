import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI!;
const mongoClient = new MongoClient(uri);

async function getDbBlog() {
    const client = await mongoClient.connect();
    return client.db('blog');
}
const dbBlog = getDbBlog();

export { dbBlog };
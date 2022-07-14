import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI!;
const mongoClient = new MongoClient(uri);

async function getDbBlog() {
    const client = await mongoClient.connect();
    console.log('connect', new Date());
    return client.db('blog');
}
const dbBlog = getDbBlog();

export { dbBlog };

interface TPost {
    _id: ObjectId;
    imgurl: string;
    link: string;
    postedBy: string;
    timestamp: Date;
    likedBy: string[]
}

export type { TPost };




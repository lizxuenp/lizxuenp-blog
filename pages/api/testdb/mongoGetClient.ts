import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI!;
const mongoClient = new MongoClient(uri);

async function getClient() {
    return await mongoClient.connect();
}

export default getClient;

interface TPost {
    _id: ObjectId;
    imgurl: string;
    link: string;
    postedBy: string;
    timestamp: Date;
    likedBy: string[]
}

export type { TPost };




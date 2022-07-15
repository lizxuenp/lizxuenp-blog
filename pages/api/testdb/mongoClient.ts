import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI!;
const mongoClient = new MongoClient(uri);

export default mongoClient;

interface TPost {
    _id: ObjectId;
    imgurl: string;
    link: string;
    postedBy: string;
    timestamp: Date;
    likedBy: string[]
}

export type { TPost };
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb'; 

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

type Post = {
  _id: ObjectId;
  imgurl: string;
  link: string;
  postedBy: string;
  timestamp: Date;
  likedBy: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  try {
    const posts: Post[] = [];
    const database = client.db('blog');
    const postsCL = database.collection<Post>('posts');
    const postsCS = postsCL.find();
    await postsCS.forEach((item) => {posts.push(item)});
    res.status(200).json(posts);
  } catch(er) {
    console.log(er);
  } finally {
    await client.close();
  }

}

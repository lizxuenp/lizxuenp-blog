import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { dbBlog } from '../../db/mongo';

type Post = {
  _id: ObjectId;
  imgurl: string;
  link: string;
  postedBy: string;
  timestamp: Date;
  likedBy: string[]
}

let mCounter = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | string>
) {
  if (req.method === 'GET') {
    mCounter++;
    console.log('mCounter => ', mCounter);
    try {
      const posts: Post[] = [];
      const postsCL = (await dbBlog).collection<Post>('posts');
      const postsCS = postsCL.find();
      await postsCS.forEach((item) => { posts.push(item) });
      res.status(200).json(posts);
    } catch (er) {
      console.log(er);
      res.status(500).end();
    }
    // finally {
    //   await client.close();
    // }
  } else {
    res.status(501).end();
  }
}

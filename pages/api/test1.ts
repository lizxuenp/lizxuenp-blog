import type { NextApiRequest, NextApiResponse } from 'next';
import { dbBlog, TPost } from '../../db/mongo';

let mCounter = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TPost[] | string>
) {
  if (req.method === 'GET') {
    mCounter++;
    console.log('mCounter => ', mCounter);
    try {
      const posts: TPost[] = [];
      const postsCL = (await dbBlog).collection<TPost>('posts');
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

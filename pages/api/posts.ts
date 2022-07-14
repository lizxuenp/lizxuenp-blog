import type { NextApiRequest, NextApiResponse } from 'next';
import { dbBlog, TPost } from '../../db/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TPost[] | string>
) {
  if (req.method === 'GET') {
    try {
      const posts: TPost[] = [];
      const postsCOLL = (await dbBlog).collection<TPost>('posts');
      const postsCURS = postsCOLL.find();
      await postsCURS.forEach((item) => { posts.push(item) });
      res.status(200).json(posts);
    } catch (er) {
      console.log(er);
      res.status(500).end();
    }
  } else {
    res.status(501).end();
  }
}

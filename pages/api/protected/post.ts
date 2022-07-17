import type { NextApiRequest, NextApiResponse } from 'next';
import { TPost, dbBlog } from '../../../lib/db';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TPost[] | string>
) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      console.log("unstable_getServerSession", JSON.stringify(session, null, 2));

      try {
        const posts: TPost[] = [];
        const postsCOLL = (await dbBlog).collection<TPost>('posts');
        const postsCURS = postsCOLL.find();
        await postsCURS.forEach((item) => { posts.push(item) });
        res.status(200).json(posts);
      } catch (er) {
        console.log(er);
        res.status(401).end(); //401 Unauthorized
      }

    } else {
        res.status(501).end(); //501 Not Implemented
    } 

  } else {
    res.status(501).end();
  }
}

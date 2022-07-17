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
      res.status(200).json(JSON.stringify(session, null, 2));
    } else {
        res.status(200).json('{ error: "no session" }');
    } 
  } else {
    res.status(501).end(); //501 Not Implemented
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const someCookie = req.cookies;
    // console.log(someCookie);

    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      console.log("unstable_getServerSession", JSON.stringify(session, null, 2));
      res.status(200).json(JSON.stringify({ ...session, cookies: { ...someCookie } }, null, 2));
    } else {
        res.status(200).json(JSON.stringify({ error: 'no session', cookies: { ...someCookie } }));
    } 
  } else {
    res.status(501).end(); //501 Not Implemented
  }
}

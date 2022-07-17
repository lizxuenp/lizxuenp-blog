import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('callback/signIn', new Date());
            console.log('user', user);
            console.log('account', account);
            console.log('profile', profile);
            console.log('email', email);
            console.log('credentials', credentials);

            // const isAllowedToSignIn = true
            // if (isAllowedToSignIn) {
            //     return true
            // } else {
            //     // Return false to display a default error message
            //     return false
            //     // Or you can return a URL to redirect to:
            //     // return '/unauthorized'
            // }
            return true;
        },
        async redirect({ url, baseUrl }) {
            console.log('callback/redirect', new Date(), url, baseUrl);
            // // Allows relative callback URLs
            // if (url.startsWith("/")) return `${baseUrl}${url}`
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl) return url

            return baseUrl;
        },
        async session({ session, token, user }) {
            console.log('callback/session', new Date());
            console.log('session =>', session);
            console.log('token =>', token);
            console.log('user => ', user);

            return {...session, user: { ...session.user, id: user.id } };
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    adapter: MongoDBAdapter(clientPromise),
};


export { authOptions }; 
export default NextAuth(authOptions);
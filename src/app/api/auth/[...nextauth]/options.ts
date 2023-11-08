import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import findUserByEmail from "@/lib/findUserByEmail";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email@example.com'
                },
                password: { label: 'Password', type: 'password', placeholder: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await findUserByEmail(credentials.email);

                if (!user) {
                    return null;
                }

                try {
                    if (await bcrypt.compare(credentials.password, user.password)) {
                        return user;
                    }
                    
                } catch (e) {
                    console.log(e);
                    return null;
                }

                return null;
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                };
            }
            return token;
        }
    }
}

export default authOptions;
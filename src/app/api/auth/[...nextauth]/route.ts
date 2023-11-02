import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
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
                    return null
                }

                // const storagedUser = localStorage.getItem("user");
                // const user = storagedUser ? JSON.parse(storagedUser) : null;

                // if (!user) {
                //     return null
                // }

                if (credentials.email === "mat.dweb28@gmail.com"
                    && credentials.password === "Bandicoot2580") {
                    return {
                        id: '1',
                        email: credentials.email,
                        name: 'matias',
                        randomKey: 'Hey cool'
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log('Session Callback', { session, token })
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
            console.log('JWT Callback', { token, user })
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
            return token
        }
    }

}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
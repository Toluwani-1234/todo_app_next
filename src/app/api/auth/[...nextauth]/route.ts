import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";


let users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123", 
  },
];

// Function to add a new user (for registration)
export const addUser = (name: string, email: string, password: string) => {
  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
  };
  users.push(newUser);
  return newUser;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // For debugging
        console.log("Login attempt:", credentials.email);
        
        const user = users.find((user) => user.email === credentials.email);
        
        if (user && user.password === credentials.password) {
          console.log("Login successful for:", user.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        
        console.log("Login failed: Invalid credentials");
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
  async session({ session }) {
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
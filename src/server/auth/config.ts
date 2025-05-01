import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import EmailProvider from 'next-auth/providers/nodemailer';
import { type Adapter } from 'next-auth/adapters';

import { db } from '@/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      roles: {
        id: string;
        name: string;
        slug: string;
      }[];
    } & DefaultSession['user'];
  }

  interface User {
    roles: {
      id: string;
      name: string;
      slug: string;
    }[];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: true,
      },
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // 10 minutes
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    async session({ session, user }) {
      // Fetch user roles from the database
      const userWithRoles = await db.user.findUnique({
        where: { id: user.id },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

      // Transform the roles data to a simpler format for the session
      const roles =
        userWithRoles?.roles.map((userRole) => ({
          id: userRole.role.id,
          name: userRole.role.name,
          slug: userRole.role.slug,
        })) || [];

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          roles,
        },
      };
    },
  },
} satisfies NextAuthConfig;

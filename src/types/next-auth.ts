import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "@auth/core/jwt";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      profilePicture: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    profilePicture: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    profilePicture: string;
  }
}

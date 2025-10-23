import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "../generated/prisma/index.js";
import {
  createRefreshToken,
  createToken,
  verifyToken,
} from "../Utils/jwt.utils.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const prisma = new PrismaClient();

export const googleSignInService = async (req) => {
  try {
    let isLogin = true;
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name,
        },
      });
      isLogin = false;
    }
    req.user = { id: user.id, email: user.email };
    const loginToken = await createToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await createRefreshToken({
      id: user.id,
      email: user.email,
    });
    return {
      isLogin,
      token: loginToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};

export const meService = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { error: "Authorization header missing" };
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });
    if (!user) {
      return { error: "User not found" };
    }
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

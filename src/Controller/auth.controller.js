import {
  createAdminTokenService,
  googleSignInService,
  meService,
} from "../Service/auth.service.js";

export const googleSignIn = async (req, res) => {
  const result = await googleSignInService(req);
  return res.json(result);
};
export const me = async (req, res) => {
  const result = await meService(req);
  return res.json(result);
};

export const createAdminToken = async (req, res) => {
  const result = await createAdminTokenService(req);
  return res.json(result);
};

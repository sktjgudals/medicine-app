import {
  generateAccessOauthToken,
  generateAccessToken,
  generateRefreshToken,
} from "../token";

const settingTokenGenerateFunc = async (res: any) => {
  if (res["type"] === "local") {
    if (res["email"]) {
      const access_token = (await generateAccessToken(
        res["id"],
        res["email"],
        res["nickname"],
        res["image"]
      )) as any;
      const refresh_token = await generateRefreshToken(access_token, "local");
      return { access_token, refresh_token };
    }
  } else {
    const access_token = (await generateAccessOauthToken(
      res["id"],
      res["nickname"],
      res["image"],
      res["email"]
    )) as any;
    const refresh_token = await generateRefreshToken(access_token, res["type"]);
    return { access_token, refresh_token };
  }
};

export { settingTokenGenerateFunc };

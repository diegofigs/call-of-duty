import { request } from "undici";

let baseSsoToken = "";
if (process.env.COD_SSO_TOKEN) {
  login(process.env.COD_SSO_TOKEN);
}

const baseUrl = "https://my.callofduty.com/api/papi-client";
export async function sendRequest(path: string) {
  try {
    if (!baseSsoToken) throw new Error("Not Logged In.");
    const { body } = await request(`${baseUrl}${path}`, {
      method: "GET",
      headers: buildHeaders(baseSsoToken),
    });

    return body.json();
  } catch (exception: unknown) {
    throw exception;
  }
}

export function login(ssoToken: string) {
  if (!ssoToken || ssoToken.trim().length <= 0) return false;
  baseSsoToken = ssoToken;
  return true;
}

const fakeXSRF = "68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041";
const baseHeaders = {
  "X-XSRF-TOKEN": fakeXSRF,
  "X-CSRF-TOKEN": fakeXSRF,
  "content-type": "text/plain",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
};

const baseCookie = "new_SiteId=cod;ACT_SSO_LOCALE=en_US;country=US;";
const buildHeaders = (ssoToken: string) => {
  const cookie = `${baseCookie}ACT_SSO_COOKIE=${ssoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
  return {
    ...baseHeaders,
    "Atvi-Auth": ssoToken,
    "ACT_SSO_COOKIE": ssoToken,
    "atkn": ssoToken,
    "cookie": cookie,
  };
};

import superagent from "superagent";

let baseSsoToken = "";
if (process.env.COD_SSO_TOKEN) {
  login(process.env.COD_SSO_TOKEN);
}

const fakeXSRF = "68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041";
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";
const baseCookie = "new_SiteId=cod;ACT_SSO_LOCALE=en_US;country=US;";
const baseUrl = "https://my.callofduty.com/api/papi-client";

export async function getRequest(path: string) {
  try {
    if (!baseSsoToken) throw new Error("Not Logged In.");
    const cookie = `${baseCookie}ACT_SSO_COOKIE=${baseSsoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
    const response = await superagent(baseUrl + path)
      .set("content-type", "application/json")
      .set("user-agent", userAgent)
      .set("X-XSRF-TOKEN", fakeXSRF)
      .set("X-CSRF-TOKEN", fakeXSRF)
      .set("Atvi-Auth", baseSsoToken)
      .set("ACT_SSO_COOKIE", baseSsoToken)
      .set("atkn", baseSsoToken)
      .set("cookie", cookie);
    return response.body;
  } catch (error) {

  }
}

export async function postRequest(path: string, body?: string | object) {
  try {
    if (!baseSsoToken) throw new Error("Not Logged In.");
    const cookie = `${baseCookie}ACT_SSO_COOKIE=${baseSsoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
    const response = await superagent.post(baseUrl + path)
      .send(body)
      .set("content-type", "text/plain")
      .set("user-agent", userAgent)
      .set("X-XSRF-TOKEN", fakeXSRF)
      .set("X-CSRF-TOKEN", fakeXSRF)
      .set("Atvi-Auth", baseSsoToken)
      .set("ACT_SSO_COOKIE", baseSsoToken)
      .set("atkn", baseSsoToken)
      .set("cookie", cookie);
    return response.body;
  } catch (error) {

  }
}

export function login(ssoToken: string) {
  if (!ssoToken || ssoToken.trim().length <= 0) return false;
  baseSsoToken = ssoToken;
  return true;
}

export function getToken() {
  return baseSsoToken;
}

import { IncomingHttpHeaders } from "http";
import { request } from "undici";

const userAgent: string =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";
let baseCookie: string = "new_SiteId=cod;ACT_SSO_LOCALE=en_US;country=US;";
let baseSsoToken: string = "";

interface CustomHeaders extends IncomingHttpHeaders {
  "X-XSRF-TOKEN"?: string | undefined;
  "X-CSRF-TOKEN"?: string | undefined;
  "Atvi-Auth"?: string | undefined;
  ACT_SSO_COOKIE?: string | undefined;
  atkn?: string | undefined;
  cookie?: string | undefined;
  "content-type"?: string | undefined;
  "user-agent"?: string | undefined;
}

let baseHeaders: CustomHeaders = {
  "content-type": "application/json",
  cookie: baseCookie,
  "user-agent": userAgent,
};

let basePostHeaders: CustomHeaders = {
  "content-type": "text/plain",
  cookie: baseCookie,
  "user-agent": userAgent,
};

const baseUrl = "https://my.callofduty.com/api/papi-client";

if (process.env.COD_SSO_TOKEN) {
  login(process.env.COD_SSO_TOKEN);
}

export async function sendRequest(path: string) {
  try {
    if (!baseSsoToken) throw new Error("Not Logged In.");
    const { body } = await request(`${baseUrl}${path}`, {
      method: "GET",
      headers: baseHeaders,
    });

    return body.json();
  } catch (exception: unknown) {
    throw exception;
  }
}

export async function sendPostRequest(path: string, data: string) {
  try {
    if (!baseSsoToken) throw new Error("Not Logged In.");
    const { body } = await request(`${baseUrl}${path}`, {
      method: "POST",
      headers: basePostHeaders,
      body: data,
    });

    return body.json();
  } catch (exception: unknown) {
    throw exception;
  }
}

export function login(ssoToken: string): boolean {
  if (!ssoToken || ssoToken.trim().length <= 0) return false;
  let fakeXSRF = "68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041";
  baseHeaders["X-XSRF-TOKEN"] = fakeXSRF;
  baseHeaders["X-CSRF-TOKEN"] = fakeXSRF;
  baseHeaders["Atvi-Auth"] = ssoToken;
  baseHeaders["ACT_SSO_COOKIE"] = ssoToken;
  baseHeaders["atkn"] = ssoToken;
  baseHeaders[
    "cookie"
  ] = `${baseCookie}ACT_SSO_COOKIE=${ssoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
  baseSsoToken = ssoToken;
  basePostHeaders["X-XSRF-TOKEN"] = fakeXSRF;
  basePostHeaders["X-CSRF-TOKEN"] = fakeXSRF;
  basePostHeaders["Atvi-Auth"] = ssoToken;
  basePostHeaders["ACT_SSO_COOKIE"] = ssoToken;
  basePostHeaders["atkn"] = ssoToken;
  basePostHeaders[
    "cookie"
  ] = `${baseCookie}ACT_SSO_COOKIE=${ssoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
  return true;
}
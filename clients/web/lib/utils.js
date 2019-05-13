import { parseCookies } from "nookies";

export function checkIfLoggedIn(ctx = null) {
  const cookies = parseCookies(ctx);
  return typeof cookies.token !== "undefined" ? true : false;
}

export default { checkIfLoggedIn };

import Router from "next/router";
import { parseCookies } from "nookies";

export function redirect(context, target) {
  if (context && context.res) {
    context.res.writeHead(302, { Location: target });
    context.res.end();
  } else {
    Router.pushRoute(target);
  }
}

export function checkIfLoggedIn(context = null) {
  const cookies = parseCookies(context);
  return typeof cookies.token !== "undefined" ? true : false;
}

export function redirectIfLoggedIn(context = null) {
  if (checkIfLoggedIn(context)) redirect(context, "/trips");
}

export default { redirect, checkIfLoggedIn, redirectIfLoggedIn };

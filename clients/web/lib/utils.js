import Router from "next/router";
import { parseCookies } from "nookies";

export function checkIfLoggedIn(ctx = null) {
  const cookies = parseCookies(ctx);
  return typeof cookies.token !== "undefined" ? true : false;
}

export function redirect(context, target) {
  if (context.res) {
    context.res.writeHead(302, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
}

export default { checkIfLoggedIn, redirect };

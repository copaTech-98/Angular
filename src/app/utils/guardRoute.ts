import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

export function documentationGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  if (state.url.includes("/documentation")) {
    return false;
  }
  return true;
}

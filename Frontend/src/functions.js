import { keyframes } from 'styled-components';
import { store } from "../wrap-with-provider";
import { navigate } from "gatsby";
import { setPage } from "./state/actions"

export function camelize(str) {
  str = str[0]
  if (typeof str !== 'string') return
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function updatePageNumber(pageNumber) {  
  const {pathname} = window.location;
  const url = pathname.includes("edit-page") ? `edit-page/?pageNumber=${pageNumber}` : `/?pageNumber=${pageNumber}`
  store.dispatch(setPage(pageNumber));
  navigate(url);
  window.scrollTo(0, 0)
}

export const formAnimation = keyframes`
  from {
    transform: scale(0);

  }
  to {
    transform: scale(1);
  }
`

import { keyframes } from "styled-components";

export function camelize(str) {
    str = str[0]
    if (typeof str !== "string") return;
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, "");
}


export const formAnimation = keyframes`
  from {
    transform: scale(0);

  }
  to {
    transform: scale(1);
  }
`;
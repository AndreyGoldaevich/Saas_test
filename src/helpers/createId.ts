import type { ILogin } from "@/interfaces/login";

export default function createId(arr: ILogin[]) {
  let max: number = 0;

  for (let i = max; i < arr.length; i += 1) {
    if (i + 1 !== arr[i].id) {
      max += 1;
    }
  }

  return max;
}

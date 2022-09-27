import { HTMLAttributes } from "react";

export default interface ChipProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
}

import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import Link from "./Link";

interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  active?: boolean;
}

export default function MenuItem({ active, ...props }: LinkProps) {
  return <Link {...props} className={active ? "active" : ""} ref={null} />;
}

import type { IconType } from "react-icons";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdCoPresent } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { LuChartPie } from "react-icons/lu";

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
  badge?: number;
  disabled?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/home", icon: PiSquaresFourBold, disabled: true },
  { label: "My Groups", href: "/groups", icon: MdCoPresent, disabled: true },
  { label: "Assignments", href: "/assignments", icon: IoDocumentTextOutline, badge: 10 },
  { label: "AI Teacher's Toolkit", href: "/toolkit", icon: RiBookLine, disabled: true },
  { label: "My Library", href: "/library", icon: LuChartPie, disabled: true },
];

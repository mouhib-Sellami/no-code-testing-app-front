import { IconHome2 } from "@tabler/icons-react";
import { LiaChartPieSolid } from "react-icons/lia";


interface LinkItem {
  label: string;
  link: string;
  isVisible?: boolean;
}

interface NavItem {
  label: string;
  icon: typeof IconHome2 | typeof LiaChartPieSolid;
  name: string;
  link?: string;
  isVisible: boolean;
  initiallyOpened?: boolean;
  links?: LinkItem[];
  permission?: string
}

interface LinksGroupProps extends NavItem {

}
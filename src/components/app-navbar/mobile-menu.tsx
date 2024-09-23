import React from "react";

import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

import AuthButton from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";

interface MobileMenuProps {
  menuItems: { label: string; href: string }[];
  isMenuOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
  return (
    <NavbarMenu>
      <NavbarMenuItem>
        <ThemeSwitcher showLabel />
      </NavbarMenuItem>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link className="w-full" href={item.href} size="lg">
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
      <NavbarMenuItem>
        <AuthButton />
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default MobileMenu;

import * as React from "react";
import { Logo } from "./logo";
import { signOut } from "../firebase/auth";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";

const Header = () => {
  const handleLogout = async () => await signOut();
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>{<Logo />}</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />

      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button onClick={handleLogout}>Logout</Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default Header;

import React, { useState } from "react";
import { Navigation } from "baseui/side-navigation";
import { useNavigate } from "react-router-dom";

const nav = [
  {
    title: "Discover",
    itemId: "/discover",
  },
];
export default function SideNavigation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("/discover");
  return (
    <Navigation
      items={nav}
      activeItemId={location}
      onChange={({ event, item }) => {
        event.preventDefault();
        setLocation(item.itemId);
        navigate("/discover");
      }}
      overrides={{
        Root: {
          style: {
            width: "10%",
            marginTop: "1rem",
          },
        },
        NavItem: {
          style: ({ $active, $theme }) => {
            if (!$active)
              return {
                ":hover": {
                  color: $theme.colors.positive400,
                },
              };
            return {
              width: "100%",
              backgroundColor: $theme.colors.positive400,
              borderLeftColor: $theme.colors.mono900,
              color: $theme.colors.mono900,
              ":hover": {
                color: $theme.colors.positive400,
              },
            };
          },
        },
      }}
    />
  );
}

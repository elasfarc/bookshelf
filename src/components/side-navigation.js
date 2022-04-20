import { Navigation } from "baseui/side-navigation";
import { useNavigate } from "react-router-dom";

const nav = [
  {
    title: "Discover",
    itemId: "/discover",
  },
  {
    title: "Reading List",
    itemId: "/list",
  },
  {
    title: "Finished Books",
    itemId: "/finished",
  },
];
export default function SideNavigation({ active }) {
  const navigate = useNavigate();

  return (
    <Navigation
      items={nav}
      activeItemId={active}
      onChange={({ event, item }) => {
        event.preventDefault();
        navigate(item.itemId);
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

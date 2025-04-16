import {
  Box,
  Group,
  Text,
  ThemeIcon,
  useDirection,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome2,
} from "@tabler/icons-react";

import classes from "./NavLinksGroup.module.css";

export type AppNavLinkProps = {
  hasLinks: boolean;
  active: boolean;
  Icon: typeof IconHome2;
  label: string;
  opened: boolean;
};

const AppNavLink: React.FC<AppNavLinkProps> = ({
  hasLinks,
  active,
  Icon,
  label,
  opened,
}) => {
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const ChevronIcon = dir === "ltr" ? IconChevronRight : IconChevronLeft;
  
  return (
      <Group
        gap={0}
        justify="space-between"
        bg={active ? theme.colors.activeLinkBgColor[0] : ""}
        p={{ xl: 8, lg: 6, md: 6 }}
        style={{
          borderRadius: 6,
        }}
        m={0}
      >
        <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeIcon variant="transparent" size={20}>
            <Icon size="1.3rem" color={theme.colors.sideNavBarLinksColor[0]} />
          </ThemeIcon>
          <Text className={`${classes.controlLink}`} fz={{ xl: 16, lg: 13, md: 10 }} m={0}>{label}</Text>
        </Box>
        {hasLinks && (
          <ChevronIcon
            className={classes.chevron}
            size="1rem"
            color="white"
            stroke={1.5}
            style={{
              transform: opened
                ? `rotate(${dir === "rtl" ? -90 : 90}deg)`
                : "none",
            }}
          />
        )}
      </Group>
  );
};

export default AppNavLink;

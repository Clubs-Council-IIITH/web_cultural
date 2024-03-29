"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { alpha, useTheme } from "@mui/material/styles";
import { Box, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Icon from "components/Icon";

export function isExternalLink(path) {
  return path.includes("http");
}

export function getActive(path, pathname) {
  if (path === "/") return pathname === path;
  return pathname.startsWith(path.split("?")[0]);
}

export default function DrawerItem({ title, path, icon }) {
  const theme = useTheme();
  const pathname = usePathname();

  const active = getActive(path, pathname);
  const externalLink = isExternalLink(path);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ListItemButton
      component={Link}
      href={path}
      sx={{
        ...theme.typography.body2,
        position: "relative",
        height: isDesktop ? 44 : 54,
        textTransform: "capitalize",
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(0.5),
        color: theme.palette.text.opposite,
        borderRadius: 1,
        // active
        ...(active && {
          ...theme.typography.subtitle2,
          color: theme.palette.accent,
          backgroundColor: alpha(theme.palette.accent, 0.16),
        }),
      }}
      {...(externalLink
        ? {
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : {})}
    >
      <ListItemIcon
        sx={{
          width: 22,
          height: 22,
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && icon}
      </ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {title}
            {externalLink && <Icon variant="link" />}
          </Box>
        }
      />
    </ListItemButton>
  );
}

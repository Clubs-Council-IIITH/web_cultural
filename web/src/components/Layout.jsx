"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Box,
  List,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Drawer as MUIDrawer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { bgBlur } from "utils/cssStyles";
import Icon from "components/Icon";
import AccountPopover from "components/profile/AccountPopover";
import DrawerItem from "components/DrawerItem";
import Logo from "components/Logo";
import ScrollbarWrapper from "components/ScrollbarWrapper";
import Footer from "components/Footer";


// define top bar width
const BAR_HEIGHT_MOBILE = 64;
const BAR_HEIGHT_DESKTOP = 70;

// define navigation drawer width
const DRAWER_HEIGHT = 70;
const DRAWER_WIDTH = 240;

// bug report external link  :: To change
export const BUG_REPORT_URL = "https://forms.office.com/r/zBLuvbBPXZ";

function Bar({ onOpenDrawer }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar
      sx={{
        ...({ backgroundColor: theme.palette.background.opposite, color: theme.palette.text.opposite }),
        boxShadow: "none",
        [isDesktop]: {
          width: "100%",
        },
      }}
    >
      <Toolbar
        sx={{
          height: BAR_HEIGHT_MOBILE,
          [isDesktop]: {
            minHeight: BAR_HEIGHT_DESKTOP,
            padding: theme.spacing(0, 5),
          },
        }}
      >
        <IconButton
          onClick={onOpenDrawer}
          sx={{
            mr: 1,
            color: "text.opposite",
            display: { lg: "none" },
          }}
        >
          <Icon variant="menu-rounded" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}


function Drawer({ drawerOpen, onCloseDrawer }) {
  const theme = useTheme();
  const pathname = usePathname();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (drawerOpen) onCloseDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  // nav items that everybody can see
  const publicItems = (
    <List disablePadding sx={{ p: 1, pt: 1, display: "inherit", flexDirection: "inherit", alignItems: "center", gap: "20px" }} >
      <DrawerItem
        title="home"
        path="/"
        icon={<Icon variant="home-outline-rounded" />}
      />
      <DrawerItem
        title="events"
        path="/events?upcoming=true&completed=true"
        icon={<Icon variant="event-rounded" />}
      />
      <DrawerItem
        title="members"
        path="/members"
        icon={<Icon variant="groups-rounded" />}
      />
      <DrawerItem
        title="gallery"
        path="/gallery"
        icon={<Icon variant="photo-library-rounded" />}
      />
    </List>
  );


  const drawerContent = (
    <div>
      {isDesktop ? (
        <Box sx={{ px: 2.5, py: 2, display: "flex", justifyContent: "space-between" }}>
          <Logo />
          {publicItems}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <AccountPopover />
          </Stack>
        </Box>
      ) : (
        <Box sx={{
          px: 2.5,
          py: 2,
          // height: "max-content",
            backgroundColor: theme.palette.background.opposite,
        }}>
          <Box display="flex" justifyContent="space-between">
            <Logo isDesktop={false} />
            {/* <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}
            >
              <AccountPopover />
            </Stack> */}
          </Box>
          <Box>
            {publicItems}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      )}
    </div>

  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: "100%" },
      }}
    >
      {isDesktop ? (
        <MUIDrawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: "100vw",
              height: "max-content",
              bgcolor: "background.opposite",
              // borderBottomStyle: "dashed",
            },
          }}
        >
          {drawerContent}
        </MUIDrawer>
      )
        : (
          <MUIDrawer
            open={drawerOpen}
            onClose={onCloseDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                width: DRAWER_WIDTH,
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.opposite",
              },
            }}
          >
            {drawerContent}
          </MUIDrawer>
        )}
    </Box>
  );

}


export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Bar onOpenDrawer={() => setDrawerOpen(true)} />
      <Drawer
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
      />
    </>
  );
}

export function Content({ children, ...props }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ScrollbarWrapper>
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          component="main"
          sx={{
            overflow: "auto",
            width: "100%",
            marginTop: `${isDesktop ? BAR_HEIGHT_DESKTOP + 20 : BAR_HEIGHT_MOBILE + 15}px`,
            paddingTop: `${isDesktop ? theme.spacing(5) : 0}`,
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up("md")]: {
              marginTop: `${DRAWER_HEIGHT}px`,
              paddingRight: theme.spacing(2),
            },
          }}
        >
          <Box px={isDesktop ? 4 : 2}>
            {children}
            <Footer club={props.club} />
          </Box>
        </Box>
      </Box>
    </ScrollbarWrapper>
  );
}


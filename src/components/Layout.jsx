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
import { useAuth } from "./AuthProvider";
import DrawerItem from "./DrawerItem";
import Logo from "components/Logo";
import ScrollbarWrapper from "./ScrollbarWrapper";
import Footer from "./Footer";


// define top bar width
const BAR_HEIGHT_MOBILE = 64;
const BAR_HEIGHT_DESKTOP = 92;

// define navigation drawer width
const DRAWER_HEIGHT = 90;
const DRAWER_WIDTH = 280;


// bug report external link  :: To change
export const BUG_REPORT_URL = "url_to_be_changed";

function Bar({ onOpenDrawer }) {
    const theme = useTheme();
    return(
        <AppBar
            sx={{
                ...({ backgroundColor: theme.palette.background.opposite, color: theme.palette.text.opposite }),
                boxShadow: "none",
                [theme.breakpoints.up("md")]: {
                width: "100%",
                },
            }}
        >
            <Toolbar
                sx={{
                minHeight: BAR_HEIGHT_MOBILE,
                [theme.breakpoints.up("md")]: {
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
                    <AccountPopover/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}


function Drawer({ drawerOpen, onCloseDrawer }) {
    const theme = useTheme();
    const pathname = usePathname();
    const { user } = useAuth();

    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(() => {
        if (drawerOpen) onCloseDrawer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pathname]);

    
    // options to show only when user is logged in
    const publicItems = (
    <List disablePadding sx={{ p: 1, pt: 1, display:"inherit", flexDirection:"inherit", alignItems:"center", gap: "20px"}} >
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
            {isDesktop? (
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
            ): (
                <Box sx={{ px: 2.5, py: 2, height: "max-content"}}>
            <Box display="flex" justifyContent= "space-between">
            <Logo />
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
            <Box display="flex" flexDirection="column" justifyItems="center">
            {publicItems}
            </Box>
            </Box>
            )}
        </div>

    );
        return(
            <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: {lg: "100%"},
            }}
            >
                {isDesktop? (
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
                                width: "100vw",
                                height: "max-content",
                                display: "flex",
                                flexDirection: "column",
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
            <Bar onOpenDrawer={() => setDrawerOpen(true)}  />
            <Drawer
            drawerOpen={drawerOpen}
            onCloseDrawer={() => setDrawerOpen(false)}
            />
        </>
        );
}

export function Content({ children }) {
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
                paddingTop: `${BAR_HEIGHT_MOBILE}px`,
                paddingBottom: theme.spacing(5),
                [theme.breakpoints.up("md")]: {
                marginTop: `${DRAWER_HEIGHT}px`,
                paddingRight: theme.spacing(2),
                },
            }}
            >
            <Box px={isDesktop ? 4 : 2}>
                {children}
                <Footer />
            </Box>
            </Box>
            </Box>
        </ScrollbarWrapper>
    );
    }


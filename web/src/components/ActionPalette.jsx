import { Box, Grid, Divider } from "@mui/material";

export default function ActionPalette({
  left = [],
  right = [],
  leftProps = [],
  rightProps = [],
}) {
  return (
    <Box width="100%">
      <Grid
        container
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Grid
          container
          size={{ xs: 12, md: 6 }}
          spacing={1}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            my: 0.5,
          }}
        >
          {left.map((Component, key) => (
            <Grid size="auto" key={key}>
              <Component {...leftProps[key]} />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          size={{ xs: 12, md: 6 }}
          spacing={1}
          sx={{
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            my: 0.5,
          }}
        >
          {right.map((Component, key) => (
            <Grid key={key}>
              <Component {...rightProps[key]} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ borderStyle: "dashed", mt: 2, mb: 2 }} />
    </Box>
  );
}

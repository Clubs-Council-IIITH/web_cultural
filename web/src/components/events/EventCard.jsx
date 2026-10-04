import Link from "next/link";

import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";

import EventPoster from "components/events/EventPoster";
import EventFallbackPoster from "components/events/EventFallbackPoster";
import DateTime from "components/DateTime";

export default function EventCard({
  _id,
  name,
  datetimeperiod,
  poster,
  clubid,
}) {
  return (
    <Card>
      <Link
        href={`/events/${_id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <CardActionArea>
          <Box sx={{ pt: "80%", position: "relative" }}>
            {poster ? (
              <EventPoster name={name} poster={poster} width={600} height={600} />
            ) : (
              <EventFallbackPoster clubid={clubid} width={300} height={400} />
            )}
          </Box>

          <Stack spacing={1} sx={{ p: 3 }}>
            <Typography variant="subtitle2" fontSize={16} noWrap>
              {name}
            </Typography>
            <Typography variant="caption" noWrap>
              <DateTime dt={datetimeperiod?.[0]} showWeekDay={true} />
            </Typography>
          </Stack>
        </CardActionArea>
      </Link>
    </Card>
  );
}

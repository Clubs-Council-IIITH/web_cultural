import Link from "next/link";
import { Box, Typography } from "@mui/material";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <Typography variant="body">
      The National Service Scheme (NSS) at the International Institute of
      Information Technology (IIIT) Hyderabad, India, is a voluntary
      organization that aims to inculcate a sense of social responsibility and
      community service among the students. The NSS unit at IIIT Hyderabad
      actively engages in various social welfare activities, community
      development programs, and outreach initiatives.
      <Box my={2} />
      The primary objective of NSS at IIIT Hyderabad is to develop the
      personality and character of students through community service. It seeks
      to instill values of selfless service, empathy, and social responsibility.
      NSS is a voluntary program, and students can choose to become NSS
      volunteers. These volunteers participate in a range of activities that
      contribute to the betterment of society.
    </Typography>
  );
}

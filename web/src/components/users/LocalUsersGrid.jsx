import { Grid } from "@mui/material";
import MemberCard from "components/members/MemberCard";

export default async function LocalUsersGrid({ users }) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {users?.map((member) => (
        <Grid key={member.uid} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <MemberCard uid={member.uid} poc={member.poc} roles={member.roles} />
        </Grid>
      ))}
    </Grid>
  );
}

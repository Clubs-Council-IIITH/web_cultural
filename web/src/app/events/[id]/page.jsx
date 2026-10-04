import { notFound } from "next/navigation";
import { getClient } from "gql/client";
import { GET_EVENT } from "gql/queries/events";

import EventDetails from "components/events/EventDetails";

export async function generateMetadata({ params }, parent) {
  const { id } = await params;

  const res = await getClient().query(GET_EVENT, {
    eventid: id,
  });
  const event = res?.data?.event;

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.name,
  };
}

export default async function Event({ params }) {
  const { id } = await params;

  const res = await getClient().query(GET_EVENT, {
    eventid: id,
  });
  const event = res?.data?.event;

  if (!event) notFound();

  return <EventDetails event={event} />;
}

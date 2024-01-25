import ImageMasonry from "components/ImageMasonry";
import ImageModal from "components/ImageModal";
import { getStaticFile } from "utils/files";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export const metadata = {
  title: "Gallery",
};

export default async function Gallery({ searchParams, limit = undefined }) {
  const response = await fetch(getStaticFile('gallery/list/'));
  const galleryJSON = await response.json();
  const galleryItems = galleryJSON
    ?.filter(item => item.startsWith(`${CLUB_ID}_`))
    ?.map(item => `${getStaticFile('gallery/')}${item}`);

  return (
    <>
      <ImageMasonry
        images={galleryItems}
        linkPrefix="/gallery?img="
        limit={limit}
      />
      <ImageModal images={galleryItems} id={searchParams?.img} />
    </>
  );
}

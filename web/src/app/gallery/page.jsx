import ImageMasonry from "components/ImageMasonry";
import ImageModal from "components/ImageModal";

import fs from "fs";
import path from "path";

export const metadata = {
  title: "Gallery",
};
  
export default async function Gallery({ searchParams, limit = undefined }) {
  const dir = path.join(process.cwd(), "public/assets/gallery");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).map((file) => `/assets/gallery/${file}`)
    : [];
  const resolvedSearchParams = await searchParams;                                                            
  const img = resolvedSearchParams?.img;
  return (
    <>
      {files && files.length ? (
        <>
          <ImageMasonry
            images={files}
            linkPrefix="/gallery?img="
            limit={limit}
          />
          <ImageModal images={files} id={img} />
        </>
      ) : (
        <center>
          <h2>Gallery not found!</h2>
        </center>
      )}
    </>
  );
}

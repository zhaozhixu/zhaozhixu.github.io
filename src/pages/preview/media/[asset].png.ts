import { mediaPaths, serveMedia } from "@/lib/draft-media";

export const getStaticPaths = mediaPaths("png");
export const GET = serveMedia;

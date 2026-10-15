import { mediaPaths, serveMedia } from "@/lib/draft-media";

export const getStaticPaths = mediaPaths("jpg");
export const GET = serveMedia;

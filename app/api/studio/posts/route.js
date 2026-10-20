import { guarded } from "@/lib/crud-routes";
import { savePost } from "@/lib/admin";

export const POST = guarded(({ body }) => savePost(null, body));

import { guarded } from "@/lib/crud-routes";
import { savePost, deletePost } from "@/lib/admin";

export const PUT = guarded(({ body, params }) => savePost(Number(params.id), body));
export const DELETE = guarded(({ params }) => deletePost(Number(params.id)));

import { guarded } from "@/lib/crud-routes";
import { saveProject } from "@/lib/admin";

export const POST = guarded(({ body }) => saveProject(null, body));

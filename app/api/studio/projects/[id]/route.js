import { guarded } from "@/lib/crud-routes";
import { saveProject, deleteProject } from "@/lib/admin";

export const PUT = guarded(({ body, params }) => saveProject(Number(params.id), body));
export const DELETE = guarded(({ params }) => deleteProject(Number(params.id)));

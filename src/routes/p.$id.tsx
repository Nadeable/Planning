import { createFileRoute } from "@tanstack/react-router";
import { DeskView } from "@/components/desk-view";

export const Route = createFileRoute("/p/$id")({
  component: ProjectPage,
});

function ProjectPage() {
  const { id } = Route.useParams();
  return <DeskView projectId={id} />;
}

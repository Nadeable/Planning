import { createFileRoute } from "@tanstack/react-router";
import { Shelf } from "@/components/shelf";

export const Route = createFileRoute("/")({ component: Shelf });

import { redirect } from "next/navigation";

export default function ParentAppIndex() {
  redirect("/app/dashboard");
}

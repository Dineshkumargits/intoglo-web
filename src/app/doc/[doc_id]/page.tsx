"use client";
import { useUser } from "@/app/lib/customHooks";
import { DocComponent } from "../../components/Doc";

export default function Doc() {
  useUser();
  return <DocComponent />;
}

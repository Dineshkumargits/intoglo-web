"use client";
import { DocBoxComponent } from "../components/DocBox";
import { useUser } from "../lib/customHooks";

export default function DocBox() {
  useUser();
  return <DocBoxComponent />;
}

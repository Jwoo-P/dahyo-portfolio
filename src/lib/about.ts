import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { About } from "@/types";

const ABOUT_PATH = path.join(process.cwd(), "content", "about.yaml");

export function getAbout(): About {
  const raw = fs.readFileSync(ABOUT_PATH, "utf-8");
  return yaml.load(raw) as About;
}

#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gitSafeRoot = root.replaceAll("\\", "/");
const markdownLink = /\[[^\]]+\]\(([^)]+)\)/g;
const retiredAdr = /\bADR-(?:00[5-9]|0[1-3][0-9]|04[01])\b/g;
const retiredPaths = [
  "references/01-core/master-index.md",
  "references/01-core/design-decisions.md",
  "references/05-foundations/",
];
const configurationFile = /\.(?:jsonc?|ya?ml|toml|ini|cfg|conf|env|properties|xml)$/i;
const textualFile = /\.(?:jsonc?|ya?ml|toml|ini|cfg|conf|env|properties|xml|md|txt|mjs|cjs|js|ts|tsx|py|sh|ps1|bat|cmd)$/i;
const portableAbsolutePathPlaceholder = /<ABSOLUTE_PATH_TO_[A-Z0-9_]+>/g;
const machineLocalFileUrl = /file:\/\/\/[A-Za-z]:\/+[^\s"'<>]*/i;
const windowsAbsolutePath = /\b[A-Za-z]:[\\/]+[^\s"'<>]*/i;
const strongWindowsHostPath = /\b[A-Za-z]:[\\/]+(?:Users|Program Files(?: \(x86\))?|ProgramData|[A-Za-z0-9_-]*Projects|Documents and Settings)(?:[\\/]+|$)/i;

function walk(directory, predicate) {
  const results = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) results.push(...walk(fullPath, predicate));
    else if (predicate(fullPath)) results.push(fullPath);
  }
  return results;
}

function projectPath(path) {
  return relative(root, path).replaceAll("\\", "/");
}

function trackedTextFiles() {
  const output = execFileSync(
    "git",
    ["-c", `safe.directory=${gitSafeRoot}`, "ls-files", "-z"],
    { cwd: root, encoding: "utf8" },
  );
  return output
    .split("\0")
    .filter(Boolean)
    .filter((path) => textualFile.test(path) || basename(path) === ".gitignore")
    .map((path) => resolve(root, path))
    .filter(existsSync);
}

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (/^\s/.test(line) || !line.includes(":")) continue;
    const separator = line.indexOf(":");
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return metadata;
}

const issues = [];
const markdownFiles = walk(root, (path) => path.endsWith(".md")).sort();
const canonicalScopes = new Map();
let canonicalCount = 0;

for (const source of trackedTextFiles()) {
  const sourceName = projectPath(source);
  const text = readFileSync(source, "utf8").replace(portableAbsolutePathPlaceholder, "");
  if (machineLocalFileUrl.test(text)) {
    issues.push(`${sourceName}: machine-local file URL in tracked content`);
    continue;
  }
  const pathPattern = configurationFile.test(sourceName) ? windowsAbsolutePath : strongWindowsHostPath;
  if (pathPattern.test(text)) issues.push(`${sourceName}: machine-local absolute path in tracked content`);
}

for (const source of markdownFiles) {
  const text = readFileSync(source, "utf8");
  const sourceName = projectPath(source);

  if (text.includes("file:///")) issues.push(`${sourceName}: machine-local file URL`);
  if (/[A-Za-z]:[\\/]Users[\\/]/.test(text)) issues.push(`${sourceName}: machine-local user path`);
  for (const retiredPath of retiredPaths) {
    if (text.includes(retiredPath)) issues.push(`${sourceName}: retired path ${retiredPath}`);
  }
  for (const match of text.matchAll(retiredAdr)) {
    issues.push(`${sourceName}: retired decision identifier ${match[0]}`);
  }

  markdownLink.lastIndex = 0;
  for (const match of text.matchAll(markdownLink)) {
    const raw = match[1].trim();
    const target = raw.split("#", 1)[0].trim();
    if (!target || /^(?:https?|mailto|chatgpt-conversation):/.test(target) || target.startsWith("file:///")) continue;
    const decoded = decodeURIComponent(target);
    const resolved = decoded.startsWith("/") ? resolve(root, decoded.slice(1)) : resolve(dirname(source), decoded);
    try {
      if (!statSync(resolved)) issues.push(`${sourceName}: broken link ${raw}`);
    } catch {
      issues.push(`${sourceName}: broken link ${raw}`);
    }
  }

  const metadata = frontmatter(text);
  if (metadata?.canonical?.toLowerCase() === "true") {
    canonicalCount += 1;
    const scope = metadata.authority_scope;
    if (!scope) issues.push(`${sourceName}: canonical document missing authority_scope`);
    else {
      const owners = canonicalScopes.get(scope) ?? [];
      owners.push(sourceName);
      canonicalScopes.set(scope, owners);
    }
  }
}

for (const [scope, owners] of canonicalScopes) {
  if (owners.length > 1) issues.push(`duplicate canonical authority_scope ${scope}: ${owners.join(", ")}`);
}

const skillFiles = walk(resolve(root, ".agents", "skills"), (path) => path.endsWith("SKILL.md")).sort();
for (const source of skillFiles) {
  const metadata = frontmatter(readFileSync(source, "utf8"));
  if (!metadata) issues.push(`${projectPath(source)}: missing YAML frontmatter`);
  else for (const key of ["name", "description"]) {
    if (!metadata[key]) issues.push(`${projectPath(source)}: missing ${key}`);
  }
}

const agentJsonFiles = readdirSync(resolve(root, ".agents"))
  .filter((name) => name.endsWith(".json"))
  .map((name) => resolve(root, ".agents", name));
for (const source of agentJsonFiles) {
  try {
    JSON.parse(readFileSync(source, "utf8"));
  } catch (error) {
    issues.push(`${projectPath(source)}: invalid JSON: ${error.message}`);
  }
}

console.log(`Repository: ${root}`);
console.log(`Markdown files: ${markdownFiles.length}`);
console.log(`Skills: ${skillFiles.length}`);
console.log(`Canonical documents: ${canonicalCount}`);
console.log(`Issues: ${issues.length}`);
for (const issue of issues) console.log(`- ${issue}`);
process.exitCode = issues.length ? 1 : 0;

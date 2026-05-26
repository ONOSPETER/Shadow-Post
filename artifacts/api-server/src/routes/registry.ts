import { Router } from "express";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// On Vercel (and other serverless platforms) process.cwd() is read-only.
// /tmp is the only writable directory. Data written here survives within a
// single warm function instance but is lost on cold starts — for true
// persistence across instances you would need a database (e.g. Postgres,
// Redis, or KV). This keeps the function from crashing while the registry
// is small / low-traffic.
const DATA_DIR = process.env.VERCEL
  ? join("/tmp", "shadowpost")
  : join(process.cwd(), "data");

const REGISTRY_FILE = join(DATA_DIR, "key-registry.json");

let cache: Record<string, string> | null = null;

function load(): Record<string, string> {
  if (cache) return cache;
  try {
    cache = JSON.parse(readFileSync(REGISTRY_FILE, "utf-8")) as Record<string, string>;
  } catch {
    cache = {};
  }
  return cache;
}

function save(reg: Record<string, string>): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(REGISTRY_FILE, JSON.stringify(reg, null, 2));
}

const router = Router();

router.get("/:address", (req, res) => {
  const address = req.params["address"];
  const reg = load();
  const publicKey = reg[address];
  if (!publicKey) {
    res.status(404).json({ error: "Key not found" });
    return;
  }
  res.json({ address, publicKey });
});

router.post("/", (req, res) => {
  const { address, publicKey } = req.body as { address?: string; publicKey?: string };
  if (!address?.startsWith("0x") || !publicKey) {
    res.status(400).json({ error: "address and publicKey required" });
    return;
  }
  const reg = load();
  reg[address] = publicKey;
  cache = reg;
  save(reg);
  res.json({ ok: true, address });
});

export default router;

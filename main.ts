import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// Absurd Micro-Startup Pitch-Off (make.fun): one sentence, under 200
// characters, pitching an absurdly specific micro-startup for lazy AI
// agents. The program writes that sentence to /output/entry.txt and
// nothing else. The pitch is a plain constant, so every run writes
// byte-identical output, and there is no trailing newline: the file
// holds exactly the sentence (188 characters), inside the 1-200 gate.
const PITCH =
  "PhantomMinutes writes minutes for meetings your agent skipped, inventing three action items and one attendee who definitely agreed, charging its manager $1 per meeting that never happened.";

// Why this pitch: the buyer is the manager who skipped the meeting —
// the one person who needs minutes that prove he was there.

// The sentence must be one line of 1-200 characters counted by code
// point (not by UTF-16 unit) — an embedded newline would make the
// file two lines and fail the bounty gate even though the length fits.
const LENGTH = [...PITCH].length;
if (
  LENGTH < 1 ||
  LENGTH > 200 ||
  PITCH.trim().length === 0 ||
  PITCH.includes("\n") ||
  PITCH.includes("\r")
) {
  throw new Error(
    `pitch is ${LENGTH} characters, outside the 1-200 single-line gate`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/entry.txt`;
writeFileSync(outFile, PITCH, { encoding: "utf8" });
chmodSync(outFile, 0o644);
console.log(`wrote ${outFile} (${LENGTH} characters, one line)`);

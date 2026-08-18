#!/bin/bash
# Optional PreToolUse hook: blokir "git push --force" (atau -f) pada client kompatibel.
# Template pemuatan ada di .agents/hooks.example.json; activation harus diverifikasi per client.
# Input: JSON dari stdin, field command ada di .toolCall.args.CommandLine.
# Output: JSON {"decision": "allow"} atau {"decision": "deny", "reason": "..."} ke stdout.

input=$(cat)

# Ambil isi command dari JSON tanpa bergantung ke jq (belum tentu terpasang di semua mesin).
command_line=$(echo "$input" | grep -o '"CommandLine"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*: *"(.*)"/\1/')

if echo "$command_line" | grep -qiE "git[[:space:]]+push.*(--force|-f\b)"; then
  echo '{"decision":"deny","reason":"Force push ke remote diblokir oleh optional safety hook Lentera Pudar. Gunakan workflow non-destructive atau minta otorisasi eksplisit."}'
  exit 0
fi

echo '{"decision":"allow"}'

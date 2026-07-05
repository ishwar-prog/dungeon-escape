// Lightweight "validator" — heuristic check since we don't execute code
// in a real sandbox. Looks for signals that the player has attempted a
// real, non-trivial implementation matching expected keywords for the
// level, rather than compiling/running the code.
//
// NOTE: This is intentionally forgiving — it accepts many valid styles of
// solving each problem. It rejects unchanged starter code and clearly
// empty/placeholder attempts. See README for notes on swapping this out
// for a real sandboxed executor (e.g. Pyodide, Judge0) later.
export function heuristicCheck(code, level) {
  const stripped = code.replace(/\s+/g, " ").trim();
  const starterStripped = Object.values(level.starter)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .find((s) => s === stripped);
  if (starterStripped) return { pass: false, reason: "unchanged" };
  if (stripped.length < 30) return { pass: false, reason: "tooshort" };

  const signalGroups = {
    1: [["for", "while"], [">", "max"]],
    2: [["for", "while"]],
    3: [["for", "while"], ["==", "return"]],
    4: [["while", "for"], ["mid", "middle"]],
    5: [["for", "while"], [">", "swap", "tmp", "temp"]],
    6: [["for", "while"], ["min"]],
    7: [["for", "while"], ["!=", "==", "left", "right"]],
    8: [["count", "map", "dict", "array", "[26]", "hashmap"], ["for", "while"]],
    9: [["stack", "push", "pop", "append"]],
    10: [["stack", "push", "pop"]],
    11: [["*"], ["return"]],
    12: [["+"], ["return"]],
    13: [["next"], ["prev", "curr"]],
    14: [["slow"], ["fast"]],
    15: [["target", "complement"], ["map", "dict", "seen", "hashmap"]],
    16: [["count", "map", "dict", "[26]", "hashmap"], ["for", "while"]],
    17: [["max", "depth"], ["left", "right"]],
    18: [["low", "high", "min", "max"], ["left", "right"]],
    19: [["queue"], ["visited", "seen"]],
    20: [["+"], ["for", "while"]],
  };
  const groups = signalGroups[level.id] || [["for", "while", "return"]];
  const lc = code.toLowerCase();
  const groupHits = groups.map((group) =>
    group.some((k) => lc.includes(k.toLowerCase()))
  );
  const pass = groupHits.every(Boolean);
  return { pass, reason: pass ? "ok" : "weak" };
}

export default heuristicCheck;

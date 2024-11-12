import { Command, type SpawnOptions } from "@tauri-apps/plugin-shell";

export const execute = async (
  base: string,
  args?: string | string[],
  options?: SpawnOptions & { timeout?: number; verbose?: boolean }
) => {
  const cmd = Command.create(base, args, options);
  cmd.stdout.on("data", (v) => {
    if (options?.verbose) console.info(base, args, v);
  });
  if (typeof options?.timeout === "number") {
    setTimeout(() => {
      cmd.emit("close", { code: 124, signal: null });
    }, options.timeout);
  }

  const process = await cmd.execute();
  return process.stdout;
};

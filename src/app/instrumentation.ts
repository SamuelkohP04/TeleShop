export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { join } = await import("path");
    const { cwd, exit, platform } = await import("process");
    console.log(join("a", "b"));
    console.log(cwd());
  }
}
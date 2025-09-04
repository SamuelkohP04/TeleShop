export async function register() {
  /*
    This function dynamically imports and registers the
    appropriate instrumentation module based on the 
    runtime.

    Documentation: https://nextjs.org/docs/app/guides/instrumentation

    The documentation recommends importing files using JavaScript import syntax
    within your register function. The following example demonstrates a basic
    usage of import in a register function:
  */
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../instrumentation-node')
  }
}
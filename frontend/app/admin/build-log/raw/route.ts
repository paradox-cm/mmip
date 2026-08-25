import { loadBuildLog } from '../../_lib/load-build-log'

export async function GET() {
  const source = await loadBuildLog()

  return new Response(source, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Disposition': 'inline; filename="BUILD_LOG.md"',
    },
  })
}

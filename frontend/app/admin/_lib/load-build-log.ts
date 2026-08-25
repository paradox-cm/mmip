import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function loadBuildLog() {
  const filePath = path.join(process.cwd(), 'app/admin/BUILD_LOG.md')
  return readFile(filePath, 'utf8')
}

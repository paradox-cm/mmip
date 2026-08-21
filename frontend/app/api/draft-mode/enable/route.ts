import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

/**
 * defineEnableDraftMode() is used to enable draft mode. Set the route of this file
 * as the previewMode.enable option for presentationTool in your sanity.config.ts
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#5-integrating-with-sanity-presentation-tool--visual-editing
 *
 * Next collects this route during `next build`. Do not throw at import time when
 * SANITY_API_READ_TOKEN is unset — return 503 instead so published Preview builds
 * can finish.
 */

const draftModeHandlers = token
  ? defineEnableDraftMode({
      client: client.withConfig({ token }),
    })
  : null

export async function GET(request: Request) {
  if (!draftModeHandlers) {
    return new Response('Draft mode is not configured', { status: 503 })
  }

  return draftModeHandlers.GET(request)
}

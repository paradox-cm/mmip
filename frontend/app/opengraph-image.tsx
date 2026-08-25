import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_MISSION } from '@/lib/social-image'

export const alt = DEFAULT_SOCIAL_IMAGE.alt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const assetDirectory = join(process.cwd(), 'public', 'logo')
const fontDirectory = join(process.cwd(), 'app', 'fonts')

const brandAssets = Promise.all([
  readFile(join(assetDirectory, 'logo.svg')),
  readFile(join(process.cwd(), 'public', 'OG-Img.png')),
  readFile(join(fontDirectory, 'RealHeadProBold.ttf')),
  readFile(join(fontDirectory, 'HelveticaNowText.ttf')),
  readFile(join(fontDirectory, 'HelveticaNowTextMedium.ttf')),
])

export default async function OpenGraphImage() {
  const [logo, illustration, realHead, helveticaNow, helveticaNowMedium] = await brandAssets
  const logoSource = `data:image/svg+xml;base64,${logo.toString('base64')}`
  const illustrationSource = `data:image/png;base64,${illustration.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          background: '#FCF8F3',
          color: '#1C335B',
          padding: '66px 82px',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 332,
            background: '#F5EDE4',
            overflow: 'hidden',
          }}
        >
          <img
            src={illustrationSource}
            width="470"
            height="360"
            alt=""
            style={{
              position: 'absolute',
              right: -88,
              objectFit: 'contain',
            }}
          />
        </div>

        <div
          style={{
            width: 820,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <img src={logoSource} width="96" height="96" alt="" />
            <div
              style={{
                display: 'flex',
                fontFamily: 'Helvetica Now',
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              California MMIP Resource
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                display: 'flex',
                maxWidth: 710,
                fontFamily: 'Helvetica Now Medium',
                fontSize: 92,
                fontWeight: 500,
                letterSpacing: -3,
                lineHeight: 0.96,
              }}
            >
              Resilient Relatives
            </div>
            <div style={{ display: 'flex', width: 148, height: 10, background: '#B77900' }} />
            <div
              style={{
                display: 'flex',
                maxWidth: 650,
                fontFamily: 'Helvetica Now',
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.25,
                color: '#06161C',
              }}
            >
              {DEFAULT_SOCIAL_MISSION}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Helvetica Now',
              fontSize: 22,
              fontWeight: 400,
              color: '#425677',
            }}
          >
            Resources, connection, and support for California Tribal communities
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Real Head Pro', data: realHead, weight: 700, style: 'normal' },
        { name: 'Helvetica Now', data: helveticaNow, weight: 400, style: 'normal' },
        { name: 'Helvetica Now Medium', data: helveticaNowMedium, weight: 500, style: 'normal' },
      ],
    },
  )
}

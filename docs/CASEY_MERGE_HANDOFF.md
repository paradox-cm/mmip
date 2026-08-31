# MMIP P2 merge handoff

Branch: `mmip-p2` → `caseykennedy/mmip` (`master`)

Casey’s repo (July 2025 – May 2026) is the product skeleton: schema, routing, search, tribes, services, and a first visual pass. This PR is the second pass over that work. It ships the public Resilient Relatives site: design-system contract, site chrome, directory UX, accessibility gates, admin console, Get Help, and deploy hardening.

CMS navigation records, directory templates, service/tribe detail pages, and the Sanity data model stay in place.

## What P2 ships

- Semantic token contract, dark appearance, and a living catalog at `/admin/design`
- Public header, footer, appearance control, hide-website, skip link, and command palette
- Directory UX for services, tribes, articles, guides, and tools
- Get Help at `/get-help`, with the terracotta crisis CTA in the header and footer
- Admin console at `/admin` (session login; design catalog and this build log)
- Algolia search wiring for `posts`, `services`, and `tribes` (production still needs keys and the webhook)
- Canonical sitemap and robots URLs
- Playwright accessibility coverage on public routes

`/services` and `/tribes` stay on their dedicated App Router pages. The CMS also has lightweight `page` documents for those slugs so editors can select them in navigation. The catch-all route must not prerender those documents, or Next emits duplicate static output and serves the generic page builder in place of the directory.

This pass also:

- makes sitemap and robots URLs absolute and canonical;
- makes the Playwright configuration self-contained by declaring `@next/env` directly; and
- excludes Next's generated `next-env.d.ts` from the source lint gate.

## Search: expected merge behavior

The working site at `https://www.resilientrelatives.org/search` uses the same Sanity project and
the same three Algolia index names that this code expects:

- `posts`
- `services`
- `tribes`

If this merge deploys through the Vercel project that currently serves
`www.resilientrelatives.org`, search should work after the deployment without any source change or
new keys. Vercel environment variables are not stored in Git and persist across a normal GitHub PR
merge.

Do **not** copy a public search key from the deployed site or commit any key to this repository.

## Vercel configuration to verify before merge

The Vercel project must use `frontend` as its Root Directory. Confirm these environment variables
are present in the target project:

| Variable                                    | Scope               | Purpose                                               |
| ------------------------------------------- | ------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`             | Production, Preview | Sanity project ID (`t4dq0r7i`)                        |
| `NEXT_PUBLIC_SANITY_DATASET`                | Production, Preview | Sanity dataset (`production`)                         |
| `NEXT_PUBLIC_SANITY_API_VERSION`            | Production, Preview | Sanity API version                                    |
| `SANITY_API_READ_TOKEN`                     | Production, Preview | Draft mode and Presentation support                   |
| `NEXT_PUBLIC_BASE_URL`                      | Production          | `https://www.resilientrelatives.org` canonical origin |
| `NEXT_PUBLIC_ALGOLIA_APP_ID`                | Production, Preview | Public Algolia application ID                         |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY`        | Production, Preview | Search-only key, limited to the three indexes         |
| `ALGOLIA_WRITE_API_KEY`                     | Production, Preview | Server-only indexing key                              |
| `SANITY_WEBHOOK_SECRET`                     | Production, Preview | Shared secret for the indexing webhook                |
| `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASSWORD` | Production, Preview | Admin access control                                  |

`NEXT_PUBLIC_*` values are baked into each browser build. Add or correct them before the deployment
that is meant to enable search, then redeploy.

## Algolia permissions and first index check

Use a restricted search key in the browser with only the `search` ACL and access limited to
`posts`, `services`, and `tribes`. Use a separate server-only write key for the indexing endpoint;
the application uses Algolia's atomic `replaceAllObjects` operation, whose required ACL is
`addObject`.

Before merge, locally pull the target project's environment variables and run:

```sh
cd frontend
vercel env pull .env.local --environment=production --yes
pnpm check:search
```

The check must report access to all three indexes. It does not print credentials.

If the keys are present and the index counts are current, no reindex is required. If they are
missing, new, or stale, make one authenticated full refresh after deployment:

```sh
curl --fail-with-body \
  --request POST \
  --url "https://www.resilientrelatives.org/api/search/index" \
  --header "Authorization: Bearer $SANITY_WEBHOOK_SECRET" \
  --header "Content-Type: application/json" \
  --data '{"indexType":"all"}'
```

The response should report successful `posts`, `services`, and `tribes` index updates. This call
is intentionally server-authenticated; do not expose the write key in the browser.

## Sanity webhook and CORS

In Sanity, ensure there is a document webhook for the `production` dataset:

- URL: `https://www.resilientrelatives.org/api/search/index`
- Method: `POST`
- Header: `Authorization: Bearer <SANITY_WEBHOOK_SECRET>`
- Include drafts: off
- Trigger filter:

  ```groq
  before()._type in ["post", "service", "tribe"] ||
  after()._type in ["post", "service", "tribe"]
  ```

- Projection:

  ```groq
  {"indexType": select(delta::operation() == "delete" => before()._type, after()._type)}
  ```

Also add `https://www.resilientrelatives.org` to Sanity's CORS origins. Credentials should normally
remain disabled for this public frontend. This removes the visible "Sanity Live couldn't connect"
message seen on the temporary Vercel deployment. Per-commit Vercel preview URLs cannot be
pre-authorized safely; use a stable preview domain if browser Live updates are required in preview.

## Release verification

1. Deploy the PR as a Vercel preview using the target project's Preview variables.
2. Verify `/services` shows 35 entries and `/tribes` shows 111 entries; open one detail page from
   each directory.
3. Open `/get-help` and confirm the header and footer Get Help CTA.
4. Search `Fort Mojave`. It should return the Fort Mojave service and tribe, matching the live
   reference site.
5. Run `pnpm check:search` with the target production environment.
6. Check `/sitemap.xml` and `/robots.txt` use `https://www.resilientrelatives.org`, not localhost
   or a host-only URL.
7. Merge, deploy production, then verify the Sanity webhook after a small published content update.

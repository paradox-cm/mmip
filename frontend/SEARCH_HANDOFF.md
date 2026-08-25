# Search handoff

Search is implemented and degrades to a neutral “temporarily unavailable” state until Algolia is
configured. The remaining work requires access to an Algolia application and the Sanity project
settings; no source changes should be needed.

## 1. Create the Algolia credentials

Create or select an Algolia application, then provide these values:

| Environment variable                 | Exposure        | Value                                                                                         |
| ------------------------------------ | --------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ALGOLIA_APP_ID`         | Browser-visible | Algolia application ID                                                                        |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` | Browser-visible | Search-only key with the `search` ACL, restricted to `posts`, `services`, and `tribes`        |
| `ALGOLIA_WRITE_API_KEY`              | Server-only     | Custom write key with the `addObject` ACL, restricted to `posts*`, `services*`, and `tribes*` |
| `SANITY_WEBHOOK_SECRET`              | Server-only     | Strong random secret shared by Vercel and the Sanity webhook                                  |

The wildcard restrictions on the write key are intentional: Algolia's atomic replacement helper
uses temporary index names while it refreshes an index. Do not use the Algolia Admin API key in the
browser or commit any key. The route temporarily accepts the legacy `ALGOLIA_ADMIN_API_KEY`
variable, but a restricted `ALGOLIA_WRITE_API_KEY` is preferred.

Generate the webhook secret locally if needed:

```sh
openssl rand -hex 32
```

`SANITY_API_READ_TOKEN` remains optional for published content in the current public dataset. It is
required for draft/Presentation content, or if the dataset is made private.

## 2. Add deployment variables

Add all four search variables to Vercel for Production and Preview. Add them to Development if
teammates will use `vercel env pull`. Mark `ALGOLIA_WRITE_API_KEY` and `SANITY_WEBHOOK_SECRET` as
sensitive.

For local development, put the same values in `frontend/.env.local`. Never commit that file.
Redeploy or restart the Next.js app after adding the values because `NEXT_PUBLIC_*` variables are
embedded in the browser bundle at build time.

## 3. Create and populate the indexes

After deploying the variables, run one authenticated full index refresh. Set these shell variables
locally without committing them:

```sh
export SEARCH_SITE_URL="https://your-production-domain.example"
export SEARCH_WEBHOOK_SECRET="the-same-value-as-SANITY_WEBHOOK_SECRET"

curl --fail-with-body \
  --request POST \
  --url "$SEARCH_SITE_URL/api/search/index" \
  --header "Authorization: Bearer $SEARCH_WEBHOOK_SECRET" \
  --header "Content-Type: application/json" \
  --data '{"indexType":"all"}'
```

The response should report `success: true` and record counts for `posts`, `services`, and `tribes`.
The refresh atomically replaces each requested index, so deleted Sanity documents do not remain in
search results and empty content types still get a valid empty index.

## 4. Configure the Sanity webhook

In the Sanity project settings, create a webhook with:

- URL: `https://your-production-domain.example/api/search/index`
- Dataset: `production`
- Method: `POST`
- Triggers: Create, Update, Delete
- Include drafts: Off
- API version: `2024-10-28` or newer
- Header: `Authorization: Bearer <SANITY_WEBHOOK_SECRET>`

Filter:

```groq
before()._type in ["post", "service", "tribe"] ||
after()._type in ["post", "service", "tribe"]
```

Projection:

```groq
{
  "indexType": select(
    delta::operation() == "delete" => before()._type,
    after()._type
  )
}
```

This projection ensures delete events still identify the index that must be refreshed.

## 5. Verify the handoff

After adding the values to `frontend/.env.local`, run:

```sh
pnpm check:search
```

The check does not print any credential. It confirms that all variables are present, that the
public search key can query all three indexes, and reports the record count in each index.

Then verify in the deployed site:

1. Open `/search` with no query and confirm recent content appears.
2. Search for a known post, service, and tribe.
3. Publish a small Sanity edit and confirm the webhook succeeds and the result updates.
4. Delete or unpublish a test document and confirm it disappears from search.

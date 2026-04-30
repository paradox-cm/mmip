// filepath: /Users/caseykennedy/sites/cahuilla-mmip/frontend/app/components/shared/command-palette.tsx
'use client'

import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Badge } from '@/app/components/ui/badge'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/app/components/ui/command'
import { useCommandPalette } from '@/lib/hooks/use-command-palette'
import { useSearch } from '@/lib/hooks/use-search'

import SanityImage from './sanity-image'

export default function CommandPalette() {
  const [query, setQuery] = useState('')
  const { isOpen, setIsOpen } = useCommandPalette()
  const { results, isLoading } = useSearch(query)
  const router = useRouter()

  const handleSelect = (url: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(url)
  }

  const handleSearchPage = () => {
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setQuery('')
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} shouldFilter={false}>
      <CommandInput
        placeholder="Search articles, guides, tools..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {isLoading && (
          <div className="p-8 text-center text-sm text-muted-foreground">Searching...</div>
        )}

        {!isLoading && query && results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        {results.length > 0 && (
          <>
            <CommandGroup heading={query ? 'Results' : 'Recents'}>
              {results.map(result => {
                return (
                  <CommandItem
                    key={result.objectID}
                    value={result.title}
                    onSelect={() => handleSelect(result.url)}
                    className="flex items-start gap-4 p-4"
                  >
                    <div>
                      <SanityImage
                        source={result.coverImage ?? null}
                        alt={result.coverImage?.alt ?? ''}
                        className="aspect-video w-full max-w-32 rounded-lg"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-row items-center gap-1">
                        {/* <Badge variant={result.postType} className="bg-transparent">
                          {result.topic.name}
                        </Badge> */}
                      </div>
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <span className="text-base font-medium">{result.title}</span>
                        <Badge variant={result.postType} className="capitalize text-white">
                          {result.postType}
                        </Badge>
                      </div>
                      {result.category?.name && (
                        <div className="text-xs text-muted-foreground">
                          in {result.category.name}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {query && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleSearchPage} className="flex items-center gap-3">
                    <LuSearch className="size-4" />
                    <span>Search for {query} on search page</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}

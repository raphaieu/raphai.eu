import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pt-br', 'en-us'],

  // Used when no locale matches
  defaultLocale: 'pt-br',

  // The `pathnames` configuration defines how the locales are displayed in the URL
  pathnames: {
    '/': '/',
    // Add more pathnames as needed
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

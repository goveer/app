# Veer App

A modern healthcare scheduling and management application built with Next.js 13+.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── dashboard/         # Dashboard routes
│   ├── auth/             # Auth routes
│   │   ├── callback/     # OAuth callback
│   │   └── confirm/      # Email confirmation
│   ├── login/           # Login page
│   └── signup/          # Signup page
├── components/
│   ├── ui/              # Base UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── auth/           # Authentication components
│   └── layout/         # Layout components
└── lib/
    ├── supabase/       # Supabase clients
    │   ├── client.ts   # Browser client
    │   ├── server.ts   # Server client
    │   └── middleware.ts # Auth middleware
    └── utils/          # Helper functions
```

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI (Primitives)
  - Shadcn/ui (Component System)
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: React Server Components + Client Hooks
- **Deployment**: Vercel

## Key Dependencies

```json
{
  "dependencies": {
    "next": "13.x",
    "react": "18.x",
    "react-dom": "18.x",
    "typescript": "5.x",
    "@radix-ui/react-*": "Latest",
    "@supabase/supabase-js": "Latest",
    "@supabase/auth-helpers-nextjs": "Latest",
    "tailwindcss": "3.x",
    "lucide-react": "Latest",
    "class-variance-authority": "Latest",
    "clsx": "Latest",
    "tailwind-merge": "Latest"
  }
}
```

## Design System

### Colors
- Primary: `#46296B`
- Secondary: `#F43F5E`
- Background: `#FFFFFF`
- Text: `#1F2937`
- Muted Text: `#64748B`
- Border: `#E2E8F0`

### Typography
- Font Family: IBM Plex Sans
- Font Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- Base Font Size: 16px
- Scale: Tailwind's default type scale

### Components
- Consistent use of Radix UI primitives
- Custom styled components using Tailwind CSS
- Dark mode support via CSS variables
- Responsive design patterns

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Best Practices

- Server Components by default
- Client Components when needed (`'use client'`)
- Server Actions for forms
- Strong TypeScript typing
- Component composition
- CSS variables for theming
- Consistent error handling
- Proper loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
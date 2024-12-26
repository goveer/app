# Veer MVP Build Plan

## Initial Setup & Configuration

### 1. Development Environment
- Sign up for Vercel (connect to GitHub)
- Configure Supabase project variables
- Set up Loops SMTP in Supabase
- Connect test Stripe account 

### 2. Project Configuration
- Create Next.js 14 project with App Router
- Install core dependencies (shadcn, maplibre, tailwind, etc)
- Set up TypeScript configuration
- Configure Prettier/ESLint

### 3. Authentication Configuration 
- Set up Google OAuth credentials
- Configure magic link settings in Supabase
- Create auth helper functions
- Set up protected routes structure

## Core Architecture

### 1. Database & Types
- Implement Supabase schema
- Set up row level security policies
- Create type definitions
- Add PHI encryption helpers

### 2. State Management
- Implement auth context
- Set up data fetching patterns
- Create PHI visibility state handlers
- Add timeout management 

### 3. Layout Structure
- Create base layout components
- Set up navigation structure
- Add error boundaries
- Implement loading states

## Key Flows 

### 1. Authentication
- Signup with role selection
- Email magic link flow  
- Google OAuth integration
- Organization handling
- Initial profile setup

### 2. Patient Management
- Import validation
- PHI protection/reveal (60-second window)
- Profile management
- Timeout handling
- Audit logging

### 3. Provider Management 
- Scheduling interface
- Map integration with fuzzing
- Location reveal mechanism
- Route optimization

## Infrastructure Considerations

### 1. Security
- HIPAA compliance validation
- PHI encryption implementation
- Audit log structure
- Session management

### 2. Performance
- API optimization
- Caching strategy
- Map tile handling
- Error recovery

### 3. Testing & Monitoring
- Error tracking setup
- Performance monitoring
- Security scanning
- User analytics

## Critical Requirements

### PHI Protection
- 60-second visibility window
- Access limited to admin/assigned provider
- Complete audit logging
- Automatic re-protection
- Fuzzy location display by default

### Role Structure
- Admin (Veer staff)
- Organization (with "self" option)
- Provider (org-linked)

### Authentication
- Email magic link/code
- Google OAuth
- Protected routes
- Session management
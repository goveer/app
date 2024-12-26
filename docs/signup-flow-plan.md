# Agency Signup Flow Implementation Plan - SIMPL-20

## Overview Section
- Issue: SIMPL-20 (30/255)
- Flow Name: Agency Signup Process
- Flow Purpose: Enable agencies to sign up and start using the system
- Entry Point(s): Marketing site CTA, Direct signup URL
- Exit Point(s): Dashboard onboarding
- Required Auth Level: None → Authenticated Agency Account
- Data Handling Level: Organization PII, Business Associate Agreement implications

## User Story Mapping
### Core Story
"As a new agency I want to a step-by-step signup process so that I can start using the system without confusion"

### Authentication Strategy
We've opted for a passwordless authentication system using:
1. Email + OTP verification
   - 6-digit code
   - 5-minute expiration
   - Rate-limited attempts
2. Google OAuth alternative
   - Faster onboarding
   - Managed security
   - Institutional trust

Benefits:
- Enhanced security (no password storage)
- Improved UX (no password management)
- Better HIPAA compliance
- Reduced attack surface
- Simpler user onboarding

### Acceptance Criteria Coverage Plan
1. Progress Indicator
   - Component: StepProgress (shadcn)
   - Persistent across all steps
   - Clear current step indication
   - Mobile-responsive design

2. Step Content Implementation
   ```
   Step 1: Basic Info
   - Agency name (required)
   - Contact info (required)
   - Number of providers (required)
   
   Step 2: Account Creation
   - Email input (required)
   - Authentication choice:
     * Email + OTP verification (primary path)
     * Google OAut
   
   Step 3: Verification
   - Email verification UI
   - Success confirmation
   - Welcome message
   ```

## Screen-by-Screen Breakdown

### Screen 1: Basic Info
#### Visual Elements
- Layout Components:
  - Card (shadcn)
  - Form layout
  - Input fields (shadcn)
  - StepProgress component
  - Next button
- Icons/Assets:
  - Logo
  - Background image
  - Progress indicator icons

#### Functional Requirements
- Form Fields:
  ```typescript
  interface BasicInfoForm {
    agencyName: string;
    contactName: string;
    contactPhone: string;
    providerCount: number;
  }
  ```
- Data Validation:
  - Agency name (required)
  - Valid phone format
  - Provider count > 0
- Progress Storage:
  - LocalStorage backup
  - Session persistence

### Screen 2: Account Creation
#### Visual Elements
- Layout Components:
  - Card (shadcn)
  - OAuth buttons
  - Email input
  - Back/Next navigation
- State Management:
  - Form completion status
  - Navigation state
  - Auth method selection

#### Technical Implementation
- Supabase Auth Integration:
  ```typescript
  const authConfig = {
    flowType: 'magiclink',
    redirectTo: '/verify',
    onAuthSuccess: (session) => {
      // Store basic info from step 1
      // Create organization record
      // Redirect to verification
    }
  }
  ```

### Screen 3: Verification
#### Visual Elements
- Layout Components:
  - Verification status card
  - OTP input (if email path)
  - Success message
  - Loading states
- Success States:
  - Email verified
  - Account activated
  - Ready for onboarding

## Technical Dependencies
1. Components Needed:
   - StepProgress
   - AuthForm
   - OTPInput
   - FormLayouts
   - NavigationControls

2. Service Integrations:
   - Supabase Auth
   - Loops Email System
   - Organization Management

## Build Steps

1. Component Development
   - [ ] Create StepProgress component
   - [ ] Build form layouts
   - [ ] Implement navigation controls
   - [ ] Design mobile responsive templates

2. Form Implementation
   - [ ] Basic info collection
   - [ ] Account creation integration
   - [ ] Verification flow
   - [ ] Progress persistence

3. Auth Integration
   - [ ] Configure Supabase email auth
   - [ ] Set up Google OAuth
   - [ ] Implement OTP verification
   - [ ] Add session management

4. Data Management
   - [ ] Organization record creation
   - [ ] User profile setup
   - [ ] Initial role assignment
   - [ ] Welcome email trigger

5. Testing Requirements
   - [ ] Mobile responsive testing
   - [ ] Form validation testing
   - [ ] Auth flow testing
   - [ ] Progress save/restore testing

## Outstanding Questions
1. Should we maintain the password requirement or switch fully to OTP/OAuth?
2. What specific contact information fields are required for agencies?
3. Do we need additional HIPAA compliance fields for the BAA?
4. What happens if verification email is never completed?

## Required Information
1. BAA template and requirements
2. Required agency fields for HIPAA compliance
3. Organization structure requirements
4. Email template content and timing

## Next Steps
1. Clarify auth method decision (OTP vs Password)
2. Confirm agency data requirements
3. Review HIPAA compliance needs
4. Set up development environment
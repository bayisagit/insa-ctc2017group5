# Food Delivery App Implementation Guide

## Initial Setup
1. Clean up project files:
   - Remove all files from `public/*`
   - Clear contents of `globals.css`
   - Clear contents of `page.tsx`

2. Install and configure shadcn/ui:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button label input sonner
   ```

3. Test setup:
   - Add a button component
   - Verify development server works (`npm run dev`)

## Part 1: Authentication Setup

### Database & Auth Configuration
1. Install dependencies:
   ```bash
   npm install better-auth
   npm install prisma --save-dev
   ```

2. Set up environment:
   - Create `.env` file with required variables
   - Initialize PostgreSQL database (recommend Neon.tech)

3. Prisma setup:
   ```bash
   npx prisma init
   npx prisma db push
   ```
   - Add `generated` to `.gitignore`
   - Update `package.json` scripts

4. Auth configuration:
   - Create `lib/prisma.ts` for single Prisma Client instance
   - Generate auth tables: `npx @better-auth/cli generate --output=auth.schema.prisma`
   - Review and adjust `schema.prisma` models (User, Session, Account, Verification)
   - Push database changes

5. Auth implementation:
   - Create mount handler in `app/api/auth/[...all]/route.ts`
   - Adjust ESLint config to ignore generated files
   - Create client instance in `lib/auth-client.ts`

### User Authentication
1. Email & Password Auth:
   - Enable in configuration
   - Create sign-up form (`components/register-form.tsx`)
   - Implement form validation
   - Handle sign-up flow (auto-sign-in)

2. Session management:
   - Display session on profile page
   - Implement sign-out functionality

3. Sign-in flow:
   - Create login form (`components/login-form.tsx`)
   - Handle unauthorized access
   - Implement error handling

## Part 2: Advanced Auth Features

1. Request/Response cycle hooks
2. Auth options configuration:
   - `autoSignIn`
   - `advanced.database.generateId`
   - `emailAndPassword.password` (with Argon2 hashing)

3. Server Actions:
   - Implement sign-up via server actions
   - Implement sign-in via server actions
   - Handle cookie management

4. Next.js cookies plugin

## Part 3: Session Management

1. Client-side session:
   - Create "Get Started" button
   - Implement `useSession` hook
   - Configure session expiration

2. Middleware:
   - Session cookie validation
   - Route protection

3. Error handling
4. Hooks:
   - Email validation
   - Name transformation

## Part 4: Role-Based Access

1. Custom roles implementation:
   - Add UserRole enum to Prisma
   - Push database changes
   - Update user creation flow

2. Profile management:
   - Display user role
   - Configure additional user fields

3. Admin features:
   - Admin dashboard
   - User management
   - Role dropdown for admins

4. Database hooks
5. Admin plugin setup

## Part 5: OAuth Integration

1. Google OAuth implementation
2. GitHub OAuth implementation
3. Account linking
4. Error handling pages

## Part 6: Email Verification & Password Recovery

1. Nodemailer setup
2. Email verification flow:
   - Configuration options
   - Verification page
   - Error handling

3. Password recovery:
   - Forgot password page
   - Reset password flow

## Part 7: User Management & Advanced Features

1. User profile:
   - Update user information
   - Change password

2. Custom sessions
3. Magic link authentication
4. Cookie caching

---

### Additional Notes:
- Each section should be tested before proceeding to the next
- Database should be truncated when testing different configurations
- Pay attention to TypeScript types throughout implementation
- Consider error states and edge cases at each step

Would you like me to elaborate on any specific part of this implementation plan?
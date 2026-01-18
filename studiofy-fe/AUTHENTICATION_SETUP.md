# Authentication Pages Setup

All authentication pages have been created following your exact pattern from the registry example.

## ✅ What's Been Created

### 1. **Utility Files**
- `src/utils/apiClient.ts` - Axios client with interceptors
- `src/utils/handleApiError.ts` - Error handling utility

### 2. **Type Definitions**
- `src/types/response/Response.type.ts` - Response wrapper type
- `src/types/Auth/AuthTokens.type.ts` - Authentication tokens type

### 3. **Zod Schemas**
- `src/schema/auth/login.schema.ts`
- `src/schema/auth/signup.schema.ts`
- `src/schema/auth/forgot-password.schema.ts`
- `src/schema/auth/reset-password.schema.ts`
- `src/schema/auth/verify-email.schema.ts`

### 4. **API Functions**
- `src/api/auth.api.ts` - All authentication API endpoints in one file

### 5. **Custom Hooks**
- `src/hooks/auth/useLogin.ts`
- `src/hooks/auth/useSignUp.ts`
- `src/hooks/auth/useForgotPassword.ts`
- `src/hooks/auth/useResetPassword.ts`
- `src/hooks/auth/useVerifyEmail.ts`

### 6. **Page Components**
- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/(auth)/signup/page.tsx` - Signup page
- `src/app/(auth)/forgot-password/page.tsx` - Forgot password page
- `src/app/(auth)/reset-password/page.tsx` - Reset password page
- `src/app/(auth)/verify-email/page.tsx` - Verify email page

## 📋 Next Steps

### 1. Add Assets
Place these files in `src/assets/`:
- `auth-bg.png` - Background image for auth pages
- `logo.png` - Your logo

### 2. Update API Endpoints
When you have the endpoints, update `src/api/auth.api.ts`:
- `/auth/signin` - Login endpoint
- `/auth/signup` - Signup endpoint
- `/auth/forgot-password` - Forgot password endpoint
- `/auth/reset-password` - Reset password endpoint
- `/auth/verify-email` - Verify email endpoint
- `/auth/refresh-token` - Token refresh endpoint

### 3. Environment Variables
Make sure these are set in your `.env.local`:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_PROVIDER_ID=your_provider_id
```

### 4. Update Redirect Paths
After successful login/signup, users are redirected to `/dashboard`. Update this in:
- `src/hooks/auth/useLogin.ts` (line with `router.push('/dashboard')`)
- `src/hooks/auth/useSignUp.ts` (line with `router.push('/dashboard')`)

## 🎨 Design Matching

All pages follow the exact same pattern as your registry example:
- Same layout structure (left image, right form)
- Same styling classes and colors (`#2C75A2` primary color)
- Same form validation patterns
- Same toast notifications
- Same Google OAuth button structure

## 📝 Notes

- All pages use `sessionStorage` for token storage (matching your pattern)
- All forms use `react-hook-form` with Zod validation
- All API calls use the `Response<T>` wrapper type
- Error handling follows your exact pattern with `handleApiError`
- Toast notifications use unique IDs per hook

## 🔗 Routes

- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Forgot password page
- `/reset-password?token=xxx` - Reset password page (requires token query param)
- `/verify-email?email=xxx` - Verify email page (optional email query param)

All pages are ready and will work once you:
1. Add the background image and logo
2. Update the API endpoints with your actual endpoints
3. Set the environment variables


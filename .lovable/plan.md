
# Cloudflare R2 Image Storage Migration

## Overview
Move all image uploads from the current storage to Cloudflare R2 (zero egress fees). This involves creating a backend function to proxy uploads/deletes to R2, updating the frontend upload hooks, and swapping hardcoded image URLs.

## What You Need to Do First (Cloudflare Setup)
1. Create a free Cloudflare account at cloudflare.com (if you don't have one)
2. Enable R2 in the Cloudflare dashboard
3. Create an R2 bucket (e.g. `newsletter-images`)
4. Set the bucket to **public** (Settings > Public access > allow)
5. Note down your **R2 public URL** (e.g. `https://pub-xxxxx.r2.dev` or a custom domain)
6. Create an **R2 API token** (R2 > Manage R2 API Tokens > Create):
   - Permissions: Object Read & Write
   - Note the **Access Key ID** and **Secret Access Key**
   - Note your **Cloudflare Account ID**

You'll then provide these 4 secrets to Lovable when prompted.

## Technical Implementation

### Step 1: Store R2 credentials as secrets
Add 4 secrets:
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`  
- `R2_ACCOUNT_ID`
- `R2_PUBLIC_URL` (the public bucket URL)

### Step 2: Create `upload-image` edge function
A new backend function that:
- Accepts image files via POST (multipart form data)
- Validates file type and size
- Uploads to R2 using the S3-compatible API
- Returns the public URL
- Also supports DELETE to remove images
- Handles CORS and authentication

### Step 3: Update `useImageUpload.ts`
- Replace direct storage upload with a call to the new `upload-image` edge function
- The returned URL will point to R2 instead of the current storage
- Keep the metadata save to the database (updating `public_url` to the R2 URL)

### Step 4: Update `svg-upload.tsx`
- Same approach: upload SVGs via the edge function to R2 instead of the `svg-icons` bucket

### Step 5: Update hardcoded URLs
These files contain hardcoded storage URLs that need to be pointed to R2 (after re-uploading the static assets):
- `src/utils/htmlGenerator.ts` - logo URL, 4 benefit icon URLs
- `src/components/newsletter/blocks/BenefitsBlock.tsx` - 4 benefit icon URLs

### Step 6: Migrate existing images
- Existing 266 images in the current storage will keep working at their current URLs
- New uploads will go to R2
- Optionally, you can re-upload the static assets (logo, benefit icons) to R2 and update the URLs

## What Won't Change
- Database schema (newsletters, uploaded_images tables) stays the same
- UI components (ImageUpload, SvgUpload) keep the same interface
- Newsletter builder workflow is identical from the user's perspective

## Result
- All new image uploads go to Cloudflare R2 with zero egress fees
- Existing images continue to work from their current URLs
- No visible change for users of the newsletter builder

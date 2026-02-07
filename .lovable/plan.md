

## Fix Plan: Header Alignment, Icon Positioning, and Mobile Button Layout

### 1. Replicate Product List header pattern across all blocks

The Product List header works perfectly because its header table does **not** use `table-layout:fixed`, and its "zobrazit vse" link uses `display:inline-block`. The other five blocks all have `table-layout:fixed` on the header table, which forces the `width:1%` column to literally 6px, pushing the link outside the container.

**Changes in `src/utils/htmlGenerator.ts`:**

- **Kategorie** (line 512): Remove `table-layout:fixed;` from the header table style, change viewAllHTML anchor from `display:block` to `display:inline-block`
- **Mista** (line 731): Remove `table-layout:fixed;` from the header table style, change viewAllHTML anchor from `display:block` to `display:inline-block`
- **Lokace** (line 905): Remove `table-layout:fixed;` from the header table style, change viewAllHTML anchor from `display:block` to `display:inline-block`
- **Blog** (line 1028): Remove `table-layout:fixed;` from the header table style, change viewAllHTML anchor from `display:block` to `display:inline-block`
- **Pozice** (line 1670): Remove `table-layout:fixed;` from the header table style, change viewAllHTML anchor from `display:block` to `display:inline-block`

Each block's viewAllHTML will also be updated to match the Product List format exactly:
```html
<a href="..." style="display:inline-block;font-size:14px;text-decoration:none;white-space:nowrap;mso-line-height-rule:exactly;">
  <span style="text-decoration:none;">--> </span>
  <span style="text-decoration:underline;">zobrazit vse</span>
</a>
```

### 2. Bump icon vertical offset from 1px to 2px

In `ICON_CIRCLE` (line 17), change `top:1px` to `top:2px` so the glyphs inside circular buttons are better centered on mobile.

### 3. Product List: move + button below price on mobile, align left

In the mobile `mobileBlocks` section of `generateProductListHTML` (around line 350-371), restructure the price/button area so the green + button appears on a new row below the price, aligned to the left, instead of being in the same row aligned right.

### 4. Blog: align the green arrow button to the left on mobile

The Blog block currently has `text-align:right` on the arrow button container (line 985). This stays for desktop, but in the mobile rendering we need to ensure the arrow is left-aligned. Since Blog doesn't have a separate mobile template (it reuses the same cells), we'll add a left-aligned wrapper or change the alignment to left for the arrow button div.

### Technical Details

All five header table changes follow the same pattern -- removing one CSS property (`table-layout:fixed`) and switching the anchor display from `block` to `inline-block` with the exact same markup as the Product List. This is a minimal, targeted fix that directly replicates the working pattern.

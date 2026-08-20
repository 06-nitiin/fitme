# FitMe Manual Test Checklist

Run this checklist before creating a release or showing FitMe in a portfolio. Begin with a clean browser profile or clear only the `fitme:*` browser-storage keys if you want to repeat the first-use journey.

## Quality Commands

Run these commands before manual testing:

```bash
pnpm run lint
pnpm run build
pnpm run dev
```

## Navigation and Responsive Layout

- [ ] Home, My Wardrobe, Outfit Builder, Saved Outfits, and My Avatar open from the desktop side rail.
- [ ] The same areas open from the mobile bottom navigation at a narrow browser width.
- [ ] Settings remains visibly unavailable rather than leading to a broken page.
- [ ] The main content does not sit behind the mobile bottom navigation.

## Avatar

- [ ] Change skin tone, hair style, hair colour, face shape, eye colour, and glasses.
- [ ] Change body, facial-hair, tattoo, and accessory options.
- [ ] Refresh the browser and confirm the selected avatar returns.
- [ ] Reset the avatar, refresh, and confirm the default state remains.

## Wardrobe

- [ ] Search starter items by name, brand, colour, and category.
- [ ] Filter by several categories and then clear filters.
- [ ] Add one clothing item without an image and confirm an illustrated fallback appears.
- [ ] Add one small PNG, JPG, or WebP image and confirm it appears on the card.
- [ ] Edit an item’s name and colour, then refresh to confirm changes persist.
- [ ] Delete an item, cancel once, then confirm deletion. Refresh and confirm it stays deleted.

## Outfit Builder and Recommendations

- [ ] Change Top, Bottom, Shoes, Outerwear, and Accessories independently.
- [ ] Cycle forward from the last available item and confirm the selector wraps to the first item.
- [ ] Cycle backward from the first available item and confirm the selector wraps to the final item.
- [ ] Try each rule-based recommendation and confirm it uses only wardrobe items that actually exist.
- [ ] Save a named look, cancel the naming prompt once, and confirm cancellation does not create a new saved look.

## Saved Outfits

- [ ] Confirm saved looks display their name, date, piece count, and garment names.
- [ ] Rename a saved look and refresh the page.
- [ ] Duplicate a look and confirm the duplicate has a different identity and name.
- [ ] Open a saved look in Outfit Builder, change one layer, update it, and confirm it does not create an extra card.
- [ ] Delete a saved look and confirm deletion with the browser prompt.

## MVP Boundaries

- [ ] Confirm the project does not describe rule-based recommendations as AI.
- [ ] Confirm the project does not imply that background removal or photorealistic virtual try-on is functioning.
- [ ] Confirm that uploaded image previews are treated as local browser data, not cloud-backed files.

# Chrome Web Store listing — copy/paste texts

## Name
אל תבזבז את הזמן שלך – חוסם אתרים

## Summary (up to 132 chars)
חוסם אתרים מרשימה אישית ומציג במקומם תזכורת ענקית: "אל תבזבז את הזמן שלך".

## Description
חוסם אתרים פשוט וממוקד. מוסיפים לרשימה את האתרים שגוזלים לכם זמן, ובכל פעם שתנסו להיכנס אליהם יופיע במקומם מסך עם הכיתוב הענק "אל תבזבז את הזמן שלך".

• חסימה בלחיצה אחת מתוך האתר עצמו, וביטול חסימה באותה קלות
• דף ניהול לרשימה, כולל עריכה כטקסט לייבוא וייצוא
• חסימת דומיין חוסמת גם את כל תתי-הדומיינים שלו
• הרשימה מסתנכרנת בין המחשבים שלכם דרך חשבון Chrome
• בלי איסוף מידע, בלי פרסומות, בלי בקשות רשת

---

A simple, focused site blocker. Add the sites that eat your time, and whenever you open one of them you get a giant reminder instead: "Don't waste your time" (in Hebrew).

## Category
Productivity → Workflow & Planning

## Language
Hebrew

## Single purpose
Blocks websites from a user-defined list and shows a reminder page in their place.

## Permission justifications
- **declarativeNetRequest**: redirects navigations to sites on the user's block list to the extension's built-in reminder page.
- **storage**: saves the user's list of blocked sites (chrome.storage.sync).
- **activeTab**: lets the toolbar popup read the current tab's domain so the user can block or unblock it with one click.
- **Host permissions (<all_urls>)**: required by Chrome for declarativeNetRequest redirect rules; the user can block any site, so the rules must be able to apply to any site. The extension never reads page content.

## Remote code
No, I am not using remote code.

## Data usage
Collects no user data. Tick the three certifications (no selling, no unrelated use, no creditworthiness).

## Privacy policy URL
https://github.com/TzviNoy/site-blocker/blob/main/PRIVACY.md

## Images
- Store icon 128×128: `extension/icons/icon128.png`
- Screenshots 1280×800: `store/screenshot-blocked.png`, `store/screenshot-options.png`
- Small promo tile 440×280: `store/promo-small.png`

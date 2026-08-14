========================================================================
PIXLAPE.COM — DIGITAL ASSET VAULT (NEO-BRUTALIST EDITION)
========================================================================

PROJECT STRUCTURE & ASSET PREVIEW MANAGEMENT GUIDE
------------------------------------------------------------------------

modtrove_web/
├── index.html                  Main Digital Asset Vault Homepage
├── modtrove_preview.html       Legacy/Redirect Fallback to page/preview.html
├── page/
│   └── preview.html            Dynamic Asset Detail & Preview Page
├── resources/
│   ├── css/
│   │   └── style.css           Unified Neo-Brutalist CSS Stylesheet & Tokens
│   ├── js/
│   │   ├── assets-data.js      Centralized Asset Database (40+ items)
│   │   ├── app.js              Homepage Controller (Search, Filter, Modal)
│   │   └── preview.js          Dynamic Preview Page Controller & Query Loader
│   └── font/                   Custom & System Typography Assets
└── readme.txt                  Project Documentation & File Tree

------------------------------------------------------------------------
DYNAMIC ASSET PREVIEW USAGE:
- Pass the asset ID as a URL query parameter: `page/preview.html?id=1`
- The system automatically loads data from `ASSET_DATABASE` in `assets-data.js`.
- Responsive, modular, clean separation of HTML, CSS, JS, and Data.
========================================================================
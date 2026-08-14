import { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Why Neo-Brutalism is Taking Over Modern Web & UI Design",
    excerpt: "Thick outlines, raw typography, high-contrast color, and zero apologies. Explore why top studios and indie devs are ditching minimal for brutal.",
    date: "Aug 01, 2026",
    readTime: "5 min read",
    author: "PIXLApe Team",
    category: "DESIGN TRENDS",
    tag: "POPULAR",
    icon: "🎨",
    imageUrl: "/icon/stock/blog001.svg",
    caption: "Neo-Brutalist design embraces raw aesthetics with bold borders and vibrant colors.",
    highlights: [
      "Explores modern brutalist UI design trends",
      "Practical developer & creator workflow tips",
      "Free-and-pro tool recommendations from vault",
    ],
    shareUrls: {
      twitter: "https://twitter.com/intent/tweet?text=Why%20Neo-Brutalism%20is%20Taking%20Over%20Modern%20Web%20Design&url=https://modtrove.com/blog/1",
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https://modtrove.com/blog/1",
    },
    content: `
### 🚀 Why Neo-Brutalism is Transforming Modern Web Interfaces

Modern web design has entered a new era. For years, digital platforms were dominated by clean, ultra-minimal, and uniform design systems. While clean, many websites began looking identical. Enter **Neo-Brutalism**: a design movement that embraces raw aesthetics, high-contrast borders, bold typography, vibrant colors, and hard drop shadows.

#### 💡 Core Principles of Neo-Brutalism

1. **High Contrast & Hard Borders**: Unapologetic black borders (\`2px\` to \`4px\`) around elements create distinct visual boundaries.
2. **Hard Off-Set Drop Shadows**: Sharp 90-degree shadows (\`4px 4px 0px #000\`) without soft blur filters give components a tactile, vintage desktop feel.
3. **Vibrant, Curated Color Palette**: Bright neon tones like acid mint, signal blue, riot purple, and poster yellow paired with deep black text.
4. **Expressive Typography**: Bold grotesque headings paired with clean monospaced sub-text.

> *"Neo-Brutalism isn't about breaking usability — it's about breaking boredom. It gives digital products a distinct voice, personality, and physical presence."*

#### 🛠️ Key Technical Takeaways for Developers

When implementing Neo-Brutalist design systems in modern frameworks like Next.js and Tailwind CSS:

- **CSS Custom Properties**: Define tokens for border colors, hard shadow offsets, and accent palettes.
- **Micro-Interactions**: Use crisp translate animations on hover (\`hover:-translate-x-0.5 hover:-translate-y-0.5\`) to create satisfying tactile feedback.
- **Semantic Structure**: Maintain high contrast accessibility standards (WCAG AAA) for readable text across light and dark themes.

Here's a quick example of a Neo-Brutalist button in Tailwind CSS:

\`\`\`css
.btn-brutal {
  border: 2px solid #351E28;
  box-shadow: 4px 4px 0 #351E28;
  transition: all 0.2s ease;
}

.btn-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #351E28;
}

.btn-brutal:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 #351E28;
}
\`\`\`

Stay tuned for our upcoming component library and design token templates dropping next week in the ModTrove Vault!
    `,
  },
  {
    id: 2,
    title: "10 Developer & Designer Tools for Maximum Productivity",
    excerpt: "From CLI batch converters to system cleanup scripts — the essential free-and-pro utilities every creator needs in their workflow this year.",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    author: "Alex Rivers",
    category: "WORKFLOW",
    tag: "GUIDE",
    icon: "⚡",
    imageUrl: "/icon/stock/blog002.svg",
    caption: "Essential developer tools for a streamlined workflow.",
    highlights: [
      "Top 10 curated developer utilities",
      "CLI tools that save hours every week",
      "Free alternatives to paid SaaS products",
    ],
    shareUrls: {
      twitter: "https://twitter.com/intent/tweet?text=10%20Developer%20Tools%20for%20Maximum%20Productivity&url=https://modtrove.com/blog/2",
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https://modtrove.com/blog/2",
    },
    content: `
### ⚡ 10 Developer & Designer Tools You Need Right Now

The modern developer ecosystem is overflowing with tools — but which ones actually move the needle? We tested dozens of utilities and narrowed it down to **10 essentials** that will genuinely accelerate your workflow.

#### 🏆 Top Picks for Developers

1. **Ripgrep (rg)** — Blazing fast recursive search that outperforms \`grep\` by orders of magnitude.
2. **fzf** — Fuzzy finder for your terminal. Once you use it, you can't go back.
3. **Bat** — A \`cat\` clone with syntax highlighting and Git integration.
4. **LazyGit** — Terminal UI for git that makes complex operations intuitive.
5. **HTTPie** — A user-friendly cURL replacement with JSON-first design.

#### 🎨 Top Picks for Designers

1. **Figma Dev Mode** — Inspect designs with production-ready CSS output.
2. **ImageOptim** — Lossless image compression for PNG, JPEG, and GIF.
3. **Excalidraw** — Virtual whiteboard for sketching hand-drawn-like diagrams.

> *"The right tool doesn't just save time — it changes how you think about the problem."*

#### 💻 Command-Line Power Moves

Here's a productivity combo we use daily:

\`\`\`bash
# Find all TypeScript files with 'interface' and open in editor
rg -l "interface" --type ts | xargs code

# Fuzzy search git log for a specific commit
git log --oneline | fzf | cut -d' ' -f1 | xargs git show
\`\`\`

These tools are all open-source and free. Check the ModTrove vault for curated bundles and install scripts!
    `,
  },
  {
    id: 3,
    title: "Open Source & Creative Commons Licensing: A Plain-English Guide",
    excerpt: "MIT, CC0, Apache 2.0, OFL — what each license actually means when you download assets from a digital vault, and how to stay compliant.",
    date: "Jul 15, 2026",
    readTime: "4 min read",
    author: "Legal & Tech Vault",
    category: "LICENSING",
    tag: "ESSENTIAL",
    icon: "📜",
    imageUrl: "/icon/stock/blog003.svg",
    caption: "Understanding open source licenses doesn't have to be complicated.",
    highlights: [
      "Plain-English breakdown of major licenses",
      "How to stay compliant when using assets",
      "Which license to choose for your own projects",
    ],
    shareUrls: {
      twitter: "https://twitter.com/intent/tweet?text=Open%20Source%20Licensing%20Explained&url=https://modtrove.com/blog/3",
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https://modtrove.com/blog/3",
    },
    content: `
### 📜 Understanding Open Source Licenses

Open source and Creative Commons licenses are the backbone of the modern digital ecosystem. But what do they *actually* mean?

#### 📋 License Cheat Sheet

1. **MIT License** — Do whatever you want. Just keep the copyright notice. Extremely permissive.
2. **Apache 2.0** — Like MIT, but with explicit patent grants. Great for enterprise projects.
3. **GPL v3** — Copyleft: if you distribute modified versions, you must also share your source code.
4. **CC0** — Public domain dedication. No restrictions whatsoever. Use freely.
5. **CC BY** — Attribute the creator. That's the only requirement.
6. **OFL (Open Font License)** — Specifically designed for fonts. Allows bundling and redistribution.

> *"Using a library without checking its license is like driving without insurance — you're fine until you're not."*

#### ⚠️ Common Pitfalls

- **Mixing GPL code into proprietary software** without understanding copyleft obligations.
- **Using CC-BY assets commercially** without providing proper attribution.
- **Assuming "free to download" means "free to redistribute"** — it almost never does.

#### ✅ Best Practices

When downloading assets from ModTrove or any digital vault:

- Always check the \`LICENSE\` file or metadata field.
- Keep a record of attributions for CC-BY materials.
- When in doubt, reach out to the creator.

Stay compliant, stay creative.
    `,
  },
  {
    id: 4,
    title: "Building Ultra-Fast Browser Extensions with Manifest V3",
    excerpt: "A deep dive into zero-overhead background scripts, modern Web APIs, and the architectural patterns that make Manifest V3 extensions blazing fast.",
    date: "Jun 30, 2026",
    readTime: "8 min read",
    author: "Dev Underground",
    category: "BROWSER UTILS",
    tag: "TUTORIAL",
    icon: "🚀",
    imageUrl: "/icon/stock/blog004.svg",
    caption: "Manifest V3 brings performance improvements to browser extensions.",
    highlights: [
      "Deep dive into Manifest V3 architecture",
      "Service worker patterns for background scripts",
      "Performance optimization techniques",
    ],
    shareUrls: {
      twitter: "https://twitter.com/intent/tweet?text=Building%20Ultra-Fast%20Browser%20Extensions%20with%20Manifest%20V3&url=https://modtrove.com/blog/4",
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https://modtrove.com/blog/4",
    },
    content: `
### 🚀 Manifest V3: The Future of Browser Extensions

Google's Manifest V3 brought controversial changes — but also genuine performance improvements. Let's build a fast, modern extension from scratch.

#### 🔑 Key Architectural Changes

1. **Service Workers replace Background Pages** — No more persistent background pages. Service workers are event-driven and terminate when idle.
2. **Declarative Net Request API** — Replace \`webRequest\` with rule-based blocking for better performance.
3. **Worlds in Content Scripts** — \`ISOLATED\`, \`MAIN\`, and \`PAGE\` worlds give fine-grained control over script execution context.

#### 💻 Building a Minimal V3 Extension

\`\`\`json
{
  "manifest_version": 3,
  "name": "ModTrove Quick View",
  "version": "1.0.0",
  "action": { "default_popup": "popup.html" },
  "background": { "service_worker": "background.js" },
  "permissions": ["storage", "activeTab"]
}
\`\`\`

> *"Service workers aren't just a restriction — they're a forcing function for better architecture."*

#### ⚡ Performance Tips

- **Lazy-load heavy logic** — Only inject content scripts when the popup opens.
- **Use \`chrome.storage.local\`** — Faster than \`chrome.storage.sync\` for non-critical data.
- **Minimize \`declarativeNetRequest\` rules** — Each rule has a memory cost; keep them tight.

#### 📦 Deployment Checklist

1. Run \`lighthouse\` on your popup HTML.
2. Verify service worker doesn't leak memory over 24 hours.
3. Test in Chrome, Edge, and Brave — each implements V3 slightly differently.

Check the ModTrove vault for our ready-to-use extension template with hot-reload dev server included!
    `,
  },
];

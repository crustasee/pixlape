import { FAQItem } from '@/types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "Are all files on PIXLApe verified and virus-free?",
    answer: "Yes. Every file is scanned with VirusTotal (multi-engine) before being listed in the vault. We do not publish anything that hasn't passed a clean security check. You can verify the scan result yourself using the VirusTotal link on each asset's detail page.",
    category: "Security"
  },
  {
    id: 2,
    question: "Can I use PIXLApe assets in commercial projects?",
    answer: "Most assets carry open licenses such as CC0 1.0 Universal or MIT License, which allow free commercial use with no attribution required. A small number of Pro assets include extended team licenses. Always check the license badge on the individual asset page before using it commercially.",
    category: "Licensing"
  },
  {
    id: 3,
    question: "How do I request a new asset or software tool?",
    answer: "You can post a request in our Discord community under the #asset-requests channel, or reach out via the contact email on the About page. We review community requests regularly and prioritize high-demand tools.",
    category: "General"
  },
  {
    id: 4,
    question: "What is the difference between Free and Pro assets?",
    answer: "Free assets are community downloads with standard open licenses — no login required. Pro assets include full commercial team licenses, higher-resolution source files, priority CDN download speeds, and direct support from the PIXLApe team.",
    category: "Pricing"
  }
];

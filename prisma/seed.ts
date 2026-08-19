import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ASSET_DATABASE = {
  design_app: [
    { id: 4, name: "High-Res Device Mockups", desc: "Brutalist device frames and clay mockups for mobile & desktop apps.", size: "89.3 MB", os: ["windows", "macos"], rating: 4.7, downloads: 8400, tag: "PRO", icon: "📱", license: "Free for Commercial", version: "v1.8", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "PIXLApe Team" },
    { id: 7, name: "Design System Templates", desc: "Complete documentation & design token layout template for web teams.", size: "31.0 MB", os: ["windows", "linux", "macos"], rating: 4.9, downloads: 7100, tag: "NEW", icon: "📐", license: "MIT License", version: "v1.2", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "PIXLApe Team" },
    { id: 9, name: "CorelDraw 2026", desc: "CorelDraw 2026 is a vector graphics editor software developed by Corel.", size: "764 MB", os: ["all"], rating: 4.6, downloads: 19000, tag: "PRO", icon: "🎨", license: "Full Version", version: "v27.0.0.121", isPremium: true, price: 29.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "Corel Corp" },
    { id: 38, name: "Adobe XD v.59.0.1", desc: "Adobe XD 2026 combines the power of Adobe Illustrator with XD’s powerful prototyping and sharing capabilities.", size: "2.1 MB", os: ["all"], rating: 4.9, downloads: 21300, tag: "TEMPLATE", icon: "📓", license: "Free Template", version: "v5.0", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "Notion Creator" }
  ],
  multimedia: [
    { id: 10, name: "8-Bit Sound Effects Library", desc: "500+ retro arcade jump, coin, laser, and explosion sound FX.", size: "34.0 MB", os: ["all"], rating: 4.9, downloads: 18200, tag: "POPULAR", icon: "🔊", license: "CC0 1.0 Universal", version: "v2.5", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".wav", authorName: "SoundLab Studios" },
    { id: 11, name: "Lo-Fi Synthwave Music Loops", desc: "Royalty-free chill synthwave stems and background tracks.", size: "210 MB", os: ["all"], rating: 5.0, downloads: 25400, tag: "HOT", icon: "🎵", license: "Royalty Free Audio", version: "v1.0", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".mp3", authorName: "SoundLab Studios" }
  ],
  apk_package: [
    { id: 18, name: "Brutalist Tab Launcher", desc: "Fast custom startpage browser extension with bookmark shortcuts.", size: "1.4 MB", os: ["all"], rating: 4.9, downloads: 31200, tag: "MUST HAVE", icon: "🚀", license: "GPL v3", version: "v5.2", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "DevTools HQ" }
  ],
  tools_app: [
    { id: 26, name: "Fast Image Batch Converter", desc: "CLI & GUI tool to compress & convert PNG/JPG to WebP/AVIF instantly.", size: "14.8 MB", os: ["windows", "linux", "macos", "cli"], rating: 5.0, downloads: 38400, tag: "POPULAR", icon: "⚡", license: "MIT License", version: "v6.0", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".exe", authorName: "DevTools HQ" }
  ],
  art_graphics: [
    { id: 1, name: "Neo-Brutalism Icon Pack", desc: "1,200+ vector stroke icons with thick black outlines and vibrant accents.", size: "24.5 MB", os: ["windows", "macos", "linux"], rating: 4.9, downloads: 14200, tag: "POPULAR", icon: "🎨", license: "CC0 1.0 Universal", version: "v3.4", isPremium: false, price: 0.0, stock: 100, downloadLink: "https://drive.google.com/", format: ".zip", authorName: "PIXLApe Team" }
  ]
};

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const adminEmail = "project@keratuli.site";
  const existingAdmin = await prisma.user.findFirst({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("00000", 10);
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "admin",
        password: hashedPassword,
        role: "ADMIN"
      }
    });
    console.log("Created admin user:", adminUser.email);
  } else {
    console.log("Admin user already exists");
  }

  // 2. Populate products
  let count = 0;
  for (const [category, products] of Object.entries(ASSET_DATABASE)) {
    for (const prod of products) {
      const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existingProduct = await prisma.product.findUnique({
        where: { slug }
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: {
            slug,
            name: prod.name,
            desc: prod.desc,
            size: prod.size,
            os: prod.os,
            rating: prod.rating,
            downloads: prod.downloads,
            tag: prod.tag,
            icon: prod.icon,
            license: prod.license,
            version: prod.version,
            category: category,
            isPremium: prod.isPremium,
            price: prod.price,
            stock: prod.stock,
            downloadLink: prod.downloadLink,
            status: "PUBLISHED",
            authorName: prod.authorName,
            format: prod.format
          }
        });
        count++;
      }
    }
  }

  console.log(`Successfully seeded ${count} new products.`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// รันด้วย: node generate-env.js
// อ่านค่าจาก .env แล้วสร้าง env.js (สำหรับให้ browser เรียกใช้ได้)
// วิธีนี้ทำให้ key จริงอยู่ใน .env ไฟล์เดียว ไม่ต้อง hardcode ซ้ำในหลายที่

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const outPath = path.join(__dirname, 'env.js');

if (!fs.existsSync(envPath)) {
  console.error('ไม่พบไฟล์ .env — กรุณาสร้างไฟล์ .env ก่อน (ดูตัวอย่างใน .env.example)');
  process.exit(1);
}

const lines = fs.readFileSync(envPath, 'utf8').split('\n');
const env = {};

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  env[key] = value;
}

const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
for (const key of required) {
  if (!env[key]) {
    console.error(`ขาดค่า ${key} ใน .env`);
    process.exit(1);
  }
}

const output = `// ไฟล์นี้ถูกสร้างอัตโนมัติจาก .env โดย generate-env.js
// อย่าแก้ไขตรงนี้ / อย่า commit ขึ้น git
window.__ENV__ = {
  SUPABASE_URL: ${JSON.stringify(env.SUPABASE_URL)},
  SUPABASE_ANON_KEY: ${JSON.stringify(env.SUPABASE_ANON_KEY)}
};
`;

fs.writeFileSync(outPath, output, 'utf8');
console.log('สร้าง env.js สำเร็จจาก .env');

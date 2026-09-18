const fs = require('fs');

// ดึงค่าจาก process.env (สำหรับ GitHub Actions / Server) 
// ถ้าไม่มีให้ดึงจาก .env (สำหรับ Local)
const supabaseUrl = process.env.SUPABASE_URL || "ค่าเริ่มต้นกรณีไม่มีใน env";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "ค่าเริ่มต้นกรณีไม่มีใน env";

const envContent = `// ไฟล์นี้ถูกสร้างอัตโนมัติจาก .env โดย generate-env.js
// อย่าแก้ไขตรงนี้ / อย่า commit ขึ้น git
window.__ENV__ = {
  SUPABASE_URL: "${supabaseUrl}",
  SUPABASE_ANON_KEY: "${supabaseAnonKey}"
};`;

// เขียนทับลงไฟล์ env.js หรือไฟล์ที่คุณใช้งาน
fs.writeFileSync('./env.js', envContent); 
console.log('สร้างไฟล์ env.js สำเร็จ!');

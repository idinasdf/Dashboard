// ไฟล์นี้ถูกสร้างอัตโนมัติจาก .env โดย generate-env.js
// อย่าแก้ไขตรงนี้ / อย่า commit ขึ้น git

const supabaseUrl = process.env.SUPABASE_URL || "ค่าเริ่มต้นกรณีไม่มีใน env";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "ค่าเริ่มต้นกรณีไม่มีใน env";

window.__ENV__ = {
  SUPABASE_URL: supabaseUrl ,
  SUPABASE_ANON_KEY: supabaseAnonKey
};

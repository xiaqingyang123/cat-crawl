// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || '';

/**
 * 向后端 /api/rewrite 发送请求
 * @param {{ url: string, style: string }} body
 */
export async function rewrite(body) {
  const res = await fetch(`${API_BASE}/api/rewrite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Rewrite failed: ${res.status}\n${txt}`);
  }

  return res.json(); // { original, rewrite, style }
}
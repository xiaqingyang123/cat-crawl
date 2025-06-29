import { rewriteWithQwen, rewriteWithGPT } from '../utils/providers.js';

export default async function rewriteText({ text, style, model }) {
  if (!text) return '（无原文可改写）';
  if (model === 'gpt') {
    return rewriteWithGPT(text, style);
  }
  // 默认通义千问
  return rewriteWithQwen(text, style);
}
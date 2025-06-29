import OpenAI from 'openai';
import { Qwen } from '@dashscope/server-sdk';

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function rewriteWithGPT(text, style) {
  const prompt = `请用${style}风格改写以下文案，保持核心信息不变：

${text}`;
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });
  return choices[0].message.content.trim();
}

// 通义千问
export async function rewriteWithQwen(text, style) {
  const prompt = `请用${style}风格改写以下文案，保持核心信息不变：

${text}`;
  const resp = await Qwen.chat.completions.create({
    model: 'qwen-max',
    messages: [{ role: 'user', content: prompt }],
    apiKey: process.env.QWEN_API_KEY,
    temperature: 0.7
  });
  return resp.choices[0].message.content.trim();
}
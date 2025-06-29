import axios from "axios";

/**
 * 调用通义千问 (DashScope) 文本生成
 * @param {string} text  原始文案
 * @param {string} style 风格（口语化 / 文艺 / 沙雕 …）
 * @returns {string} 改写后文案
 */
export async function rewriteWithQwen(text, style) {
  if (!text) return "(原文为空)";

  const url =
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";

  const payload = {
    model: "qwen-turbo", // 如果账号只开了 turbo，可以写 'qwen-turbo'
    input: {
      messages: [
        {
          role: "user",
          content: `请用${style}风格改写以下文案，保持核心信息不变：\n\n${text}`,
        },
      ],
    },
    parameters: { temperature: 0.7 },
  };

  const { data } = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  return data.output.text.trim();
}

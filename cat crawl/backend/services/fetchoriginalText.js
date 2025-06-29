import crawler from '../utils/crawler.js';
import { load } from 'cheerio';

export default async function fetchOriginalText(url) {
  const html = await crawler(url);
  const $ = load(html);

  // 抖音
  if (url.includes('douyin.com')) {
    return $('meta[property="og:description"]').attr('content') || '（未获取到文案）';
  }

  // 小红书 (NextJS 数据在 script#__NEXT_DATA__)
  if (url.includes('xiaohongshu.com')) {
    const json = $('script#__NEXT_DATA__').html();
    try {
      const data = JSON.parse(json);
      return data?.props?.pageProps?.noteNoteDetail?.note?.desc || '（未获取到文案）';
    } catch {
      return '（未获取到文案）';
    }
  }

  // B站
  if (url.includes('bilibili.com')) {
    return $('meta[name="description"]').attr('content') || '（未获取到文案）';
  }

  return '（暂不支持该链接）';
}
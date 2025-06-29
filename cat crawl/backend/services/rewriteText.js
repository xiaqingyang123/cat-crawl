import { rewriteWithQwen} from '../utils/providers.js';

export default async function rewriteText({ text, style, model }) {
  return rewriteWithQwen(text, style);
}

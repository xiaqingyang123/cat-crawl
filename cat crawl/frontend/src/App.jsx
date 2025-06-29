import { useState } from "react";
import { rewrite } from "./api.js";
import ResultCard from "./components/ResultCard.jsx";

export default function App() {
  const [url, setUrl] = useState("");
  const [style, setStyle] = useState("口语化");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // 提交按钮
  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await rewrite({ url, style });
      setData(res);
    } catch (err) {
      console.error(err);
      alert("请求失败，请检查控制台");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-rose-50 to-indigo-50 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">猫抓文案机 🐾</h1>

      <input
        className="border rounded p-3 w-full"
        placeholder="粘贴抖音 / 小红书 / B站视频链接…"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="flex flex-wrap gap-4">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="p-2 border rounded"
        >
          {["口语化", "文艺风", "沙雕风", "高冷测评", "热情种草"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 disabled:opacity-50"
        >
          {loading ? "处理中…" : "一键提取 & 仿写"}
        </button>
      </div>

      {data && <ResultCard data={data} />}
    </div>
  );
}

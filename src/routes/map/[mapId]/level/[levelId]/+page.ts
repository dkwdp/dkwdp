import { Level as LevelSchema } from '$lib/schemas';

export const load = async ({ params, fetch }) => {
  const res = await fetch(`/content/${params.mapId}/levels/${params.levelId}/content.json`);
  if (!res.ok) throw new Error('level content not found');
  const json = await res.json();
  
  // Load external markdown files
  for (const element of json.elements) {
    if (element.type !== 'text' || !element.markdownFile) continue;
      const mdUrl = `/content/${params.mapId}/levels/${params.levelId}/${element.markdownFile}`;
      const mdRes = await fetch(mdUrl);
      if (mdRes.ok) {
        element.markdown = await mdRes.text();
      }
    }
  }
  
  const parsed = LevelSchema.parse(json);
  return { level: parsed, mapId: params.mapId };
};

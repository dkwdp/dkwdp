import { Level as LevelSchema } from '$lib/schemas';

export const load = async ({ params, fetch }) => {
  const response = await fetch(`/content/${params.mapId}/levels/${params.levelId}/content.json`);
  if (!response.ok) throw new Error('level content not found');
  const level = await response.json();
  
  for (const element of level.elements) {
    if (element.type !== 'text' || !element.markdownFile) continue;
    const markdownUrl = `/content/${params.mapId}/levels/${params.levelId}/${element.markdownFile}`;
    const markdownResponse = await fetch(markdownUrl);
    if (!markdownResponse.ok) {
      element.markdown = "**Failed to load markdown file**";
      continue;
    }
    element.markdown = await markdownResponse.text();
  }
  
  const parsed = LevelSchema.parse(level);
  return { level: parsed, mapId: params.mapId };
};

/**
 * Builds a minimal SerializedEditorState (the JSON shape
 * @payloadcms/richtext-lexical's default editor stores) from the old
 * blog content's heading/paragraphs/bullets section shape. Only uses the
 * node types the default lexicalEditor() ships with — heading, paragraph,
 * list/listitem, text — so it round-trips through the admin UI editor
 * without a custom feature needing to be registered first.
 */

type PostSection = { heading: string; paragraphs: string[]; bullets?: string[] };

const textNode = (text: string) => ({
  type: "text",
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text,
  version: 1,
});

const paragraphNode = (text: string) => ({
  type: "paragraph",
  children: [textNode(text)],
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  textStyle: "",
  version: 1,
});

const headingNode = (text: string, tag: "h2" | "h3" = "h2") => ({
  type: "heading",
  tag,
  children: [textNode(text)],
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const listNode = (items: string[]) => ({
  type: "list",
  listType: "bullet",
  start: 1,
  tag: "ul",
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  children: items.map((item) => ({
    type: "listitem",
    children: [textNode(item)],
    direction: "ltr",
    format: "",
    indent: 0,
    value: 1,
    version: 1,
  })),
});

export function sectionsToLexicalState(sections: PostSection[]) {
  const children = sections.flatMap((section) => {
    const nodes: Record<string, unknown>[] = [
      headingNode(section.heading),
      ...section.paragraphs.map(paragraphNode),
    ];
    if (section.bullets?.length) nodes.push(listNode(section.bullets));
    return nodes;
  });

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

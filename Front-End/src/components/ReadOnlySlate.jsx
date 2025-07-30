import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { useMemo } from "react";

export function ReadOnlySlate({ content }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const value = useMemo(() => {
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed)
        ? parsed
        : [{ type: "paragraph", children: [{ text: "" }] }];
    } catch {
      return [{ type: "paragraph", children: [{ text: "" }] }];
    }
  }, [content]);

  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable
        readOnly
        style={{
          padding: "8px 0",
          border: "1px solid #eee",
          minHeight: 120,
          background: "#fafafa",
          borderRadius: 4,
        }}
      />
    </Slate>
  );
}

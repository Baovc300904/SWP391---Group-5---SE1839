import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const defaultValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function MySlateEditor({ value, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [internalValue, setInternalValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const parsed = value ? JSON.parse(value) : defaultValue;
      setInternalValue(Array.isArray(parsed) ? parsed : defaultValue);
    } catch {
      setInternalValue(defaultValue);
    }
  }, [value]);

  const handleChange = (val) => {
    setInternalValue(val);
    onChange?.(JSON.stringify(val));
  };

  return (
    <Slate editor={editor} value={internalValue} onChange={handleChange}>
      <Editable
        style={{
          minHeight: 120,
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          padding: 12,
        }}
        placeholder="Nhập nội dung..."
      />
    </Slate>
  );
}

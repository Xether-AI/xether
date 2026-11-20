interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-black text-white p-6 overflow-x-auto text-sm font-mono">
      <code>{code}</code>
    </pre>
  );
}

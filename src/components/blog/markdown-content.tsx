import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

interface MarkdownContentProps {
  source: string;
}

const prettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: true,
};

export function MarkdownContent({ source }: MarkdownContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}

import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";
import BlogCard from "@/components/blogcard";

// @ts-ignore
export default function Page({ params }) {
  const post = getPostBySlug("blog-posts", params.slug);
  return (
    <div className="flex flex-col gap-20">
      <BlogCard post={post} slug={params.slug} />
      <div className="flex flex-col gap-12">
      <ReactMarkdown children={post.markdownBody} />
      </div>
    </div>
  );
}

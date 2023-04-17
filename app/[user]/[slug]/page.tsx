import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";
import BlogCard from "@/components/blogcard";
import { join } from "path";

// @ts-ignore
export default function Page({ params }) {
  const post = getPostBySlug("blog-posts", join(params.user, params.slug));
  return (
    <div className="flex flex-col gap-20">
      <BlogCard post={post} path={"/" + post.path}/>
      <div className="flex flex-col gap-12">
        <ReactMarkdown>{post.markdownBody}</ReactMarkdown>
      </div>
    </div>
  );
}

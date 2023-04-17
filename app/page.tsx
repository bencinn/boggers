import { getAllPostsWithFrontMatter } from "@/lib/posts";
import BlogCard from "@/components/blogcard";

import Link from "next/link";

async function getData() {
  const output = getAllPostsWithFrontMatter("blog-posts");
  return output;
}

export default async function Home() {
  const posts = await getData();

  return (
    <div className="flex gap-6 flex-col items-center">
      {posts &&
        posts
          .sort(
            (a, b) =>
              new Date(b.frontMatter.date).getTime() -
              new Date(a.frontMatter.date).getTime()
          )
          .map((post) => {
            return <BlogCard post={post} />;
          })}
    </div>
  );
}

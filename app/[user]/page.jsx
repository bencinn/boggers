import { getAllPostsWithFrontMatter } from "@/lib/posts";
import BlogCard from "@/components/blogcard";
import { join } from "path";

export default async function Home({ params }) {
  const posts = getAllPostsWithFrontMatter(join("blog-posts", params.user));

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
            return <BlogCard post={post} path={post.path} key={post} />;
          })}
    </div>
  );
}

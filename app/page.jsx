import BlogCard from "@/components/blogcard";
import { getAllPostsWithFrontMatter, getUserLists } from "@/lib/posts";
import path from "path";
import Link from "next/link";

export default async function Home() {
  const user = getUserLists("blog-posts");
  let posts = [];
  for (let i = 0; i<user.length; i++){
    posts = posts.concat(getAllPostsWithFrontMatter(path.join("blog-posts", user[i])))
  }

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

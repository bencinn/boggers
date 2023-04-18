import BlogCard from "@/components/blogcard";
import { getAllPostsWithFrontMatter, getUserLists, getUserListsWithData } from "@/lib/posts";
import path from "path";
import Image from "next/image";

export default async function Home() {
  const users = getUserLists("blog-posts");
  let posts = [];
  for (let i = 0; i<users.length; i++){
    posts = posts.concat(getAllPostsWithFrontMatter(path.join("blog-posts", users[i])))
  }
  let usersData = getUserListsWithData("blog-posts");
  console.log(usersData);
  return (
    <div className="flex gap-6 flex-col items-center">
<div className="flex gap-6 flex-col items-center w-[900px]">
{"User List"}
<hr className="border-black border-2 w-[100%] rounded-lg"/>
{users &&
  users
    .map((user) => {
      return <span key={user.uname} className="flex flex-row gap-3 items-center"> <Image className={`rounded-[100%] border-4 border-[` + usersData.find(obj => obj.uname === user)["colors"] + "]"} width="50" height="50" src={usersData.find(obj => obj.uname === user)["profile"]}/> {user}({usersData.find(obj => obj.uname === user)["name"]})</span>;
    })}
    </div>
      <div className="flex gap-6 flex-col items-center">
      {"Post List"}
      <hr className="border-black border-2 w-[100%] rounded-lg"/>
      {posts &&
        posts
          .sort(
            (a, b) =>
              new Date(b.frontMatter.date).getTime() -
              new Date(a.frontMatter.date).getTime()
          )
          .map((post) => {
            return <BlogCard post={post} path={post.path} key={post.path} />;
          })}
          </div>

    </div>
  );
}

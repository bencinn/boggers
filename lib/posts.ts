import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export function getPostBySlug(dataType: string, slug: string) {
  const source = fs.readFileSync(
    path.join(root, dataType, `${slug}.md`),
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    frontMatter: data,
    markdownBody: content,
  };
}

export function getAllPostsWithFrontMatter(folderName: string) {
  const files = fs
    .readdirSync(path.join(root, folderName))
    .filter((file) => file.endsWith(".md"));

  // @ts-ignore
  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, folderName, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        frontMatter: data,
        slug: postSlug.replace(".md", ""),
      },
      ...allPosts,
    ];
  }, []);
}

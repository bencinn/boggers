import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export function getPostBySlug(folderName: string, slug: string) {
  const source = fs.readFileSync(
    path.join(root, folderName, `${slug}.md`),
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    frontMatter: data,
    markdownBody: content,
    path: path.join(remove_first_occurrence(folderName, "blog-posts"), remove_last_occurrence(slug, ".md"))
  };
}

function remove_first_occurrence(str: string, searchstr: string)       {
	var index = str.indexOf(searchstr);
	if (index === -1) {
		return str;
	}
	return str.slice(0, index) + str.slice(index + searchstr.length);
}

function remove_last_occurrence(str: string, searchstr: string)       {
	var index = str.lastIndexOf(searchstr);
	if (index === -1) {
		return str;
	}
	return str.slice(0, index) + str.slice(index + searchstr.length);
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
        path: path.join(remove_first_occurrence(folderName, "blog-posts"), remove_last_occurrence(postSlug, ".md")),
        username: remove_first_occurrence(folderName, "blog-posts")
      },
      ...allPosts,
    ];
  }, []);
}

export function getUserLists(folderName: string){
  const userList = fs.readdirSync(path.join(root, folderName));
const index = userList.indexOf(".git");
if (index > -1) { // only splice array when item is found
  userList.splice(index, 1); // 2nd parameter means remove one item only
}
const indexTwo = userList.indexOf("data");
if (index > -1) { // only splice array when item is found
  userList.splice(index, 1); // 2nd parameter means remove one item only
}
  // @ts-ignore
  let returnData = []
  for (let i = 0; i < userList.length; i++){
    // @ts-ignore
    returnData.concat(getUserData("blog-posts", userList[i]));
  }
  return userList;
}

export function getUserListsWithData(folderName: string){
  const userList = fs.readdirSync(path.join(root, folderName));
const index = userList.indexOf(".git");
if (index > -1) { // only splice array when item is found
  userList.splice(index, 1); // 2nd parameter means remove one item only
}
const indexTwo = userList.indexOf("data");
if (index > -1) { // only splice array when item is found
  userList.splice(index, 1); // 2nd parameter means remove one item only
}
  // @ts-ignore
  let returnData = []
  for (let i = 0; i < userList.length; i++){
    // @ts-ignore
    returnData = returnData.concat(getUserData("blog-posts", userList[i]));
  }
  // @ts-ignore
  return returnData;
}

export function getUserData(folderName: string, userName: string){
  const data = fs.readFileSync(path.join(root, folderName, "data", userName));
  let parsedData = JSON.parse(data.toString());
  parsedData["uname"] = userName;
  return parsedData;
}

import { Post } from '@/config/type';
import { sync } from 'glob';
import path from 'path';

const BASE_PATH = '@/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getPostPath = (category?: string) => {
  const folder = category || '**';
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');

const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}`, '')
    .replace('.mdx', '');
  const [categoryPath, slug] = filePath.split('/');
  const url = `/blog/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);
  return { url, categoryPath, categoryPublicName, slug };
};

const parsePostDetail = () => {

};

const parsePost = (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = parsePostDetail();

  return {
    ...postAbstract,
    ...postDetail,
  };
};

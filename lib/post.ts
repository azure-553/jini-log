import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import dayjs from 'dayjs';

import { sync } from 'glob';
import path from 'path';
import { CategoryDetail, HeadingItem, Post, PostMatter } from '@/config/type';

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getPostPaths = (category?: string) => {
  const folder = category || '**';
  const postPath: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPath;
};

export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');

const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '');

  const [categoryPath, slug] = filePath.split('/');
  const url = `/blog/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);

  return { url, categoryPath, categoryPublicName, slug };
};

const parsePostDetail = (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date)
    .locale('ko')
    .format('YYYY년 MM월 DD일');
  return { ...grayMatter, dateString, content, readingMinutes };
};

const sortPostList = (PostList: Post[]) =>
  PostList.sort((a, b) => (a.date > b.date ? -1 : 1));

const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category);
  const postList = await Promise.all(
    postPaths.map((postPath) => parsePost(postPath)),
  );
  return postList;
};

export const getSortedPostList = async (category?: string) => {
  const postList = await getPostList(category);
  return sortPostList(postList);
};

export const getSitemapPostList = async () => {
  const postList = await getPostList();
  const baseUrl = 'https://www.d5br5.dev';
  const sitemapPostList = postList.map(({ url }) => ({
    lastModified: new Date(),
    url: `${baseUrl}${url}`,
  }));
  return sitemapPostList;
};

export const getAllPostCount = async () => (await getPostList()).length;

export const getCategoryList = () => {
  const cgPaths: string[] = sync(`${POSTS_PATH}/*`);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const cgList = cgPaths.map((path) => path.split('/').slice(-1)?.[0]);
  return cgList;
};

export const getCategoryDetailList = async () => {
  const postList = await getPostList();
  const result: { [key: string]: number } = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const post of postList) {
    const category = post.categoryPath;
    if (result[category]) {
      result[category] += 1;
    } else {
      result[category] = 1;
    }
  }
  const detailList: CategoryDetail[] = Object.entries(result).map(
    ([category, count]) => ({
      dirName: category,
      publicName: getCategoryPublicName(category),
      count,
    }),
  );

  return detailList;
};

export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace('##', '').replace('#', ''),
      link: `#${heading
        .replace('# ', '')
        .replace('#', '')
        .replace(/[\\[\]:!@#$/%^&*()+=,.]/g, '')
        .replace(/ /g, '-')
        .toLowerCase()
        .replace('?', '')}`,
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};

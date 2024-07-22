import {
  getAllPostCount,
  getCategoryDetailList,
  getPostList,
} from '@/lib/post';
import CategoryList from '@/components/post_list/CategoryList';
import PostCard from './PostCard';

interface PostListProps {
  category?: string;
}
async function PostListPage({ category }: PostListProps) {
  const postList = await getPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  console.log(postList.map((data) => data));

  return (
    <section className="mx-auto mt-12 w-full max-w-[950px] px-4">
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <section>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {postList.map((post) => (
            <PostCard key={post.url + post.date} post={post} />
          ))}
        </ul>
      </section>
    </section>
  );
}

export default PostListPage;

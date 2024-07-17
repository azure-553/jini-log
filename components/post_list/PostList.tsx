import { getAllPostCount, getCategoryDetailList } from '@/lib/post';
import CategoryList from '@/components/post_list/CategoryList';

interface PostListProps {
  category?: string;
}
async function PostListPage({ category }: PostListProps) {
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  return (
    <section className="mx-auto mt-12 w-full max-w-[950px] px-4">
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <section />
    </section>
  );
}

export default PostListPage;

import PostListPage from '@/components/post_list/PostList';
import React from 'react';

type Props = {
  params: { category: string };
};

async function CategoryPage({ params }: Props) {
  return <PostListPage category={params.category} />;
}

export default CategoryPage;

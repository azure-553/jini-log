import PostHeader from '@/components/post_detail/PostHeader';
import { getPostDetail } from '@/lib/post';
import React from 'react';

type Props = {
  params: { category: string; slug: string };
};

async function PostDetail({ params: { category, slug } }: Props) {
  const post = await getPostDetail(category, slug);
  return (
    <div>
      <PostHeader post={post} />
    </div>
  );
}

export default PostDetail;

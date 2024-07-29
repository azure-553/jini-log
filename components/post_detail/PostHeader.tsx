import { Post } from '@/config/type';

interface Props {
  post: Post;
}

function PostHeader({ post }: Props) {
  return (
    <header>
      <h1>{post.title}</h1>
    </header>
  );
}

export default PostHeader;

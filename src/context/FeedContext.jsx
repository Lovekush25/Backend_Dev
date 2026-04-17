import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import postService from "../services/postService";

export const FeedContext = createContext(null);

export function FeedProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [commentLoadingId, setCommentLoadingId] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 🔥 FETCH FEED
  const fetchFeed = useCallback(async (pageNum = 1, limit = 10) => {
    setLoading(true);
    try {
      const data = await postService.getPosts(pageNum, limit);

      if (pageNum === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }

      // check if more data exists
      setHasMore(data.length === limit);
      setPage(pageNum);
    } catch (error) {
      console.error("Feed fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 AUTO LOAD FIRST TIME
  useEffect(() => {
    fetchFeed(1);
  }, [fetchFeed]);

  // 🔥 REFRESH FEED (IMPORTANT FOR FOLLOW)
  const refreshFeed = useCallback(async () => {
    await fetchFeed(1);
  }, [fetchFeed]);

  // ❤️ LIKE (OPTIMISTIC)
  const toggleLikeOptimistic = useCallback(
    async (postId) => {
      setLikeLoadingId(postId);

      // optimistic update
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id !== postId) return post;

          const alreadyLiked = post.likes?.includes("me");

          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((id) => id !== "me")
              : [...(post.likes || []), "me"],
          };
        })
      );

      try {
        await postService.toggleLike(postId);
      } catch (error) {
        console.error("Like error:", error);
      } finally {
        setLikeLoadingId(null);
        await refreshFeed(); // 🔥 sync with backend
      }
    },
    [refreshFeed]
  );

  // 💬 ADD COMMENT
  const addComment = useCallback(
    async (postId, text) => {
      setCommentLoadingId(postId);
      try {
        await postService.addComment(postId, text);
        await refreshFeed();
      } catch (error) {
        console.error("Comment error:", error);
      } finally {
        setCommentLoadingId(null);
      }
    },
    [refreshFeed]
  );

  // 🔄 LOAD MORE (INFINITE SCROLL)
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await fetchFeed(page + 1);
  }, [fetchFeed, page, hasMore, loading]);

  const value = useMemo(
    () => ({
      posts,
      loading,
      likeLoadingId,
      commentLoadingId,
      hasMore,

      fetchFeed,
      refreshFeed, // 🔥 IMPORTANT
      loadMore,

      toggleLikeOptimistic,
      addComment,

      setPosts,
    }),
    [
      posts,
      loading,
      likeLoadingId,
      commentLoadingId,
      hasMore,
      fetchFeed,
      refreshFeed,
      loadMore,
      toggleLikeOptimistic,
      addComment,
    ]
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
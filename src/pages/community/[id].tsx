// src/pages/community/[id].tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getArticleDetail } from "@/api/article";
import BackIcon from "@/images/icons/ic_back.svg";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Article } from "@/types/article";
import { useRouter } from "next/router";

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      const fetchArticle = async () => {
        try {
          const articleIdNumber = Number(id);
          const articleData = await getArticleDetail(articleIdNumber);
          setArticle(articleData);
        } catch (err) {
          console.error(err);
          setError("게시글 정보를 불러오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [router.isReady, id]);

  if (loading) {
    return <LoadingSpinner isLoading={true} />;
  }

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!article) return <LoadingSpinner isLoading={true} />;

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        {/* <ArticleProfileSection article={article} /> */}

        <hr className="my-6 border-t border-gray-200" />

        {/* <ArticleCommentSection articleId={article.id} /> */}

        <Link
          href="/community"
          className="flex items-center gap-2 text-lg font-semibold mx-auto mt-8 text-blue-600 hover:text-blue-800"
        >
          목록으로 돌아가기
          <BackIcon className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}

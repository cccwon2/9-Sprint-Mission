// src/pages/items/[id].tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProductDetail } from "@/api/item";
import ItemDetailSection from "@/components/UI/item/ItemDetailSection";
import ItemCommentSection from "@/components/UI/comment/ItemCommentSection";
import BackIcon from "@/images/icons/ic_back.svg";
import { ProductDetail } from "@/types/product";
import { useRouter } from "next/router";

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      const fetchProduct = async () => {
        try {
          const productIdNumber = Number(id);
          const productData: ProductDetail = await getProductDetail(
            productIdNumber
          );
          setProductDetail(productData);
        } catch (err) {
          console.error(err);
          setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
        }
      };

      fetchProduct();
    }
  }, [router.isReady, id]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!productDetail)
    return (
      <>
        <div className="container mx-auto pt-24 px-4">
          상품 정보가 없습니다.
        </div>
      </>
    );

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ItemDetailSection productDetail={productDetail} />

        <hr className="my-6 border-t border-gray-200" />

        <ItemCommentSection productId={productDetail.id} />

        <Link
          href="/items"
          className="flex items-center gap-2 text-lg font-semibold mx-auto mt-8 text-blue-600 hover:text-blue-800"
        >
          목록으로 돌아가기
          <BackIcon className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}

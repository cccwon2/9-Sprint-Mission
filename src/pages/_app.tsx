import type { AppProps } from "next/app";
import FooterWrapper from "@/components/Layout/FooterWrapper";
import ClientLayout from "@/components/Layout/ClientLayout";
import Header from "@/components/Layout/Header";
import "../styles/global.css";

// 앱 전체 레이아웃을 설정하는 _app.tsx
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientLayout>
      <Header />
      <main
        className="min-h-screen"
        style={{
          minWidth: "400px",
          margin: "0",
          padding: "0",
        }}
      >
        {/* 페이지별 컴포넌트 렌더링 */}
        <Component {...pageProps} />
      </main>
      <FooterWrapper />
    </ClientLayout>
  );
}

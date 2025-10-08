import { useState } from "react";
import { Header } from "@/components/Header";
import { CountrySelector } from "@/components/CountrySelector";
import { OutfitCard } from "@/components/OutfitCard";
import { ServiceEvaluationForm } from "@/components/ServiceEvaluationForm";
import { Button } from "@/components/ui/button";
import { Upload, TrendingUp, Users, Globe } from "lucide-react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("JP");

  const outfits = [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      userName: "사쿠라",
      location: "도쿄",
      temperature: 18,
      likes: 124,
      comments: 23,
      timeAgo: "2시간 전",
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400",
      userName: "에밀리",
      location: "뉴욕",
      temperature: 12,
      likes: 98,
      comments: 15,
      timeAgo: "3시간 전",
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
      userName: "소피",
      location: "파리",
      temperature: 15,
      likes: 156,
      comments: 31,
      timeAgo: "5시간 전",
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1483118714900-540cf339fd46?w=400",
      userName: "루이스",
      location: "런던",
      temperature: 10,
      likes: 87,
      comments: 12,
      timeAgo: "6시간 전",
    },
    {
      id: "5",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      userName: "마르코",
      location: "로마",
      temperature: 20,
      likes: 203,
      comments: 45,
      timeAgo: "8시간 전",
    },
    {
      id: "6",
      imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
      userName: "이사벨",
      location: "바르셀로나",
      temperature: 22,
      likes: 178,
      comments: 28,
      timeAgo: "10시간 전",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-chart-2/10 py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold font-['Outfit'] tracking-tight">
              전 세계 현지인의
              <br />
              <span className="text-primary">실시간 옷차림</span>을 확인하세요
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              여행지의 날씨에 맞는 완벽한 패션 가이드. 현지인들이 직접 올린 실시간 옷차림 사진으로 여행 준비를 시작하세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CountrySelector onSelect={setSelectedCountry} />
              <Button size="lg" className="gap-2" data-testid="button-upload">
                <Upload className="h-5 w-5" />
                내 옷차림 공유하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">전 세계 현지인</h3>
              <p className="text-muted-foreground">
                50개국 이상의 현지인들이 실시간으로 옷차림을 공유합니다
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">실시간 기온 정보</h3>
              <p className="text-muted-foreground">
                각 포스팅마다 현지 기온 정보를 함께 제공합니다
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">커뮤니티</h3>
              <p className="text-muted-foreground">
                좋아요와 댓글로 다른 여행자들과 소통하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-['Outfit'] mb-3">실시간 옷차림 피드</h2>
            <p className="text-muted-foreground">현지인들의 최신 옷차림을 확인하세요</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} {...outfit} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" data-testid="button-load-more">
              더 보기
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-['Outfit'] mb-3">서비스 평가</h2>
            <p className="text-muted-foreground">여러분의 소중한 의견을 들려주세요</p>
          </div>
          <ServiceEvaluationForm />
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 옷차림 가이드. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

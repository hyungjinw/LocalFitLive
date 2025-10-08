import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Evaluation {
  id: string;
  isUseful: boolean;
  requirements: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      setLocation('/admin');
    }
  }, [setLocation]);

  const { data: evaluations = [], isLoading } = useQuery<Evaluation[]>({
    queryKey: ['/api/evaluations'],
  });

  const mockEvaluations: Evaluation[] = [
    {
      id: "1",
      isUseful: true,
      requirements: "다양한 국가의 옷차림 정보가 있어서 좋았습니다. 더 많은 도시가 추가되면 좋겠어요.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      isUseful: false,
      requirements: "사진이 좀 더 많았으면 좋겠습니다. 시간대별 옷차림도 궁금해요.",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      isUseful: true,
      requirements: null,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      isUseful: true,
      requirements: "기온 정보가 함께 있어서 참고하기 좋았습니다. 앱으로도 나왔으면 합니다!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const displayData = evaluations.length > 0 ? evaluations : mockEvaluations;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "방금 전";
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  const usefulCount = displayData.filter(e => e.isUseful).length;
  const notUsefulCount = displayData.filter(e => !e.isUseful).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-['Outfit'] mb-2">관리자 대시보드</h1>
          <p className="text-muted-foreground">서비스 평가 내역을 관리합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>전체 평가</CardDescription>
              <CardTitle className="text-4xl">{displayData.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">총 제출된 평가 수</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                유용해요
              </CardDescription>
              <CardTitle className="text-4xl text-chart-3">{usefulCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {displayData.length > 0 ? Math.round((usefulCount / displayData.length) * 100) : 0}% 긍정 평가
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" />
                유용하지 않아요
              </CardDescription>
              <CardTitle className="text-4xl text-chart-2">{notUsefulCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {displayData.length > 0 ? Math.round((notUsefulCount / displayData.length) * 100) : 0}% 부정 평가
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>평가 내역</CardTitle>
            <CardDescription>사용자가 제출한 평가 목록입니다</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                로딩 중...
              </div>
            ) : displayData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                아직 제출된 평가가 없습니다
              </div>
            ) : (
              <div className="space-y-4">
                {displayData.map((evaluation) => (
                  <Card key={evaluation.id} className="border-l-4" style={{
                    borderLeftColor: evaluation.isUseful ? 'hsl(var(--chart-3))' : 'hsl(var(--chart-2))'
                  }}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant={evaluation.isUseful ? "default" : "secondary"} className="gap-1">
                          {evaluation.isUseful ? (
                            <>
                              <ThumbsUp className="h-3 w-3" />
                              유용해요
                            </>
                          ) : (
                            <>
                              <ThumbsDown className="h-3 w-3" />
                              유용하지 않아요
                            </>
                          )}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(evaluation.createdAt)}
                        </div>
                      </div>
                      {evaluation.requirements && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm font-medium mb-1">요구사항/개선점</p>
                          <p className="text-sm text-muted-foreground">{evaluation.requirements}</p>
                        </div>
                      )}
                      {!evaluation.requirements && (
                        <p className="text-sm text-muted-foreground italic">추가 의견 없음</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

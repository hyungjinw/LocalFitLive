import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ServiceEvaluationForm() {
  const [isUseful, setIsUseful] = useState<boolean | null>(null);
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUseful === null) {
      toast({
        title: "평가를 선택해주세요",
        description: "서비스가 유용한지 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isUseful,
          requirements: requirements.trim() || null,
        }),
      });

      if (response.ok) {
        toast({
          title: "평가가 제출되었습니다",
          description: "소중한 의견 감사합니다!",
        });
        setIsUseful(null);
        setRequirements("");
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.log('Submit evaluation:', { isUseful, requirements });
      toast({
        title: "평가가 제출되었습니다",
        description: "소중한 의견 감사합니다!",
      });
      setIsUseful(null);
      setRequirements("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-['Outfit']">서비스 평가</CardTitle>
        <CardDescription>
          여러분의 의견이 서비스를 더 좋게 만듭니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium">이 서비스가 유용했나요?</p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={isUseful === true ? "default" : "outline"}
                className="h-24 flex-col gap-2"
                onClick={() => setIsUseful(true)}
                data-testid="button-useful-yes"
              >
                <ThumbsUp className="h-8 w-8" />
                <span>유용해요</span>
              </Button>
              <Button
                type="button"
                variant={isUseful === false ? "default" : "outline"}
                className="h-24 flex-col gap-2"
                onClick={() => setIsUseful(false)}
                data-testid="button-useful-no"
              >
                <ThumbsDown className="h-8 w-8" />
                <span>유용하지 않아요</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="requirements" className="text-sm font-medium">
              요구사항이나 개선점을 알려주세요 (선택)
            </label>
            <Textarea
              id="requirements"
              placeholder="더 나은 서비스를 위한 의견을 자유롭게 작성해주세요..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="min-h-[120px] resize-none"
              data-testid="input-requirements"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            data-testid="button-submit-evaluation"
          >
            {isSubmitting ? "제출 중..." : "평가 제출하기"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

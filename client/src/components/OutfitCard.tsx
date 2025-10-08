import { useState } from "react";
import { Heart, MessageCircle, MapPin, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface OutfitCardProps {
  id: string;
  imageUrl: string;
  userName: string;
  userAvatar?: string;
  location: string;
  temperature: number;
  likes: number;
  comments: number;
  timeAgo: string;
}

export function OutfitCard({
  imageUrl,
  userName,
  userAvatar,
  location,
  temperature,
  likes: initialLikes,
  comments,
  timeAgo,
}: OutfitCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={`${userName}의 옷차림`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-0" data-testid={`text-location`}>
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </Badge>
          <Badge className="bg-chart-2/90 backdrop-blur-sm text-white border-0" data-testid={`text-temperature`}>
            <Thermometer className="h-3 w-3 mr-1" />
            {temperature}°C
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm" data-testid="text-username">{userName}</p>
              <p className="text-xs text-white/80">{timeAgo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between border-t">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1.5 ${liked ? "text-chart-3" : ""}`}
            onClick={handleLike}
            data-testid="button-like"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm">{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" data-testid="button-comment">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{comments}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

import { OutfitCard } from '../OutfitCard'

export default function OutfitCardExample() {
  return (
    <div className="p-8 bg-background max-w-sm">
      <OutfitCard
        id="1"
        imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"
        userName="사쿠라"
        location="도쿄"
        temperature={18}
        likes={124}
        comments={23}
        timeAgo="2시간 전"
      />
    </div>
  )
}

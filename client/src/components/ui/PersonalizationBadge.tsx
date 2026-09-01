interface PersonalizationBadgeProps {
  reason: string
  className?: string
}

export default function PersonalizationBadge({ reason, className = '' }: PersonalizationBadgeProps) {
  return (
    <div className={`badge-personalized ${className}`}>
      <span className="text-sky-400">✦</span>
      <span>{reason}</span>
    </div>
  )
}

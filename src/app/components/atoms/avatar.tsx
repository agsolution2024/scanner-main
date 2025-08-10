'use client'

import {
  Avatar as ShadcnAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

interface AvatarProps {
  src?: string
  fallback: string
  alt?: string
}

export const Avatar = ({ src, fallback, alt }: AvatarProps) => {
  return (
    <ShadcnAvatar>
      {src && <AvatarImage src={src} alt={alt || fallback} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadcnAvatar>
  )
}

export default Avatar 
"use client";
import { AvatarComponent } from "avatar-initials";

interface Props {
  fullName?: string | null;
  sizeMultiplier?: number;
}

function getInitials(fullName: string): string {
  const names = fullName.trim().split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  const firstInitial = names[0].charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

export const UserProfileIcon = ({ fullName, sizeMultiplier = 1 }: Props) => {
  const initials = fullName ? getInitials(fullName) : "";
  return (
    <AvatarComponent
      classes="rounded-full"
      useGravatar={false}
      size={sizeMultiplier * 44}
      color="white"
      background="#07bcc2"
      fontSize={sizeMultiplier * 16}
      fontWeight={600}
      offsetY={sizeMultiplier * 24}
      initials={`${initials}`}
    />
  );
};

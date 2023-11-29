import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 text-black/90">
        <div className={cn("p-1 w-fit shadow-md rounded-xl", bgColor)}>
          <Icon className={cn("w-12 h-10  ", iconColor)} />
        </div>
        <div>
          <h2 className="text-2xl font-bold drop-shadow-md">{title}</h2>
          <p className="text-sm text-muted-foreground drop-shadow-xl">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
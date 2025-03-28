import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <main
      className="relative flex items-center justify-center w-full h-full bg-neutral-200 touch-none"
    >
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
    </main>
  )
}

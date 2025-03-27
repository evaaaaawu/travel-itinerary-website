import Image from "next/image";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src="/logo.webp"
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-1250"
      />
    </div>
  );
};

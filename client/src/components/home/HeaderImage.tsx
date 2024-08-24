import { cn } from "@/lib/utils";

interface HeaderImageProps {
	className?: string;
}

const HeaderImage = ({ className }: HeaderImageProps) => {
	return (
		<img
			src="/homeImg.png"
			width="550"
			height="550"
			alt="Hero"
			className={cn(
				"mx-auto overflow-hidden rounded-xl object-cover sm:w-full",
				"lg:order-last lg:aspect-square",
				className
			)}
		/>
	);
};

export default HeaderImage;

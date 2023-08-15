import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
	return (
		<div className="rounded-lg bg-background shadow-xl flex flex-col justify-between min-h-96 ">
			<div className="p-4 pb-0 h-auto">
				<Skeleton className="aspect-square w-full rounded-t-lg" />
			</div>
			<div className="p-4">
				<Skeleton className="w-full h-6 mb-1"></Skeleton>
				<Skeleton className="w-2/5 h-6 mb-4"></Skeleton>
				<div className="flex items-center justify-between">
					<Skeleton className="w-2/5 h-10"></Skeleton>
					<Skeleton className="w-1/4 h-10"></Skeleton>
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkeleton;

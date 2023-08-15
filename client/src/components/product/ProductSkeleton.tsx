import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 sm:gap-10 md:gap-20 items-start w-full md:w-5/6 mx-auto p-6 md:p-12 pb-10 lg:pt-20 shadow-2xl h-full lg:min-h-[90vh] lg:h-fit">
			<div className="grid gap-y-3">
				<Skeleton className="w-full h-[50vh]" />
				<Skeleton className="w-full h-20" />
			</div>
			<div className="grid gap-y-3">
				<Skeleton className="w-[50%] h-8" />
				<Skeleton className="w-[25%] h-8" />
				<Skeleton className="w-full h-12" />
				<Skeleton className="w-full h-36" />
				<Skeleton className="w-full h-52" />
				<div className="flex items-center justify-between">
					<Skeleton className="w-[30%] h-10" />
					<Skeleton className="w-[25%] h-10" />
				</div>
			</div>
		</div>
	);
};

export default ProductSkeleton;

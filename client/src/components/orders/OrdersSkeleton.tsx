import { Skeleton } from "../ui/skeleton";

const OrdersSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4">
			{Array.from({ length: 3 }, (_, i) => (
				<Skeleton key={i} className="w-full h-20" />
			))}
		</div>
	);
};

export default OrdersSkeleton;

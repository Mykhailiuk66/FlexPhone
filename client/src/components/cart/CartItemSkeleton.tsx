import { Skeleton } from "../ui/skeleton";

const CartItemsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4">
			{Array.from({ length: 3 }, (_, i) => (
				<Skeleton key={i} className="w-full h-28" />
			))}
		</div>
	);
};

export default CartItemsSkeleton;

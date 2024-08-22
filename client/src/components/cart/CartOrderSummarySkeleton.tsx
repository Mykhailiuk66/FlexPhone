import { Separator } from "@radix-ui/react-separator";
import { Skeleton } from "../ui/skeleton";

const CartOrderSummarySkeleton = () => {
	return (
		<div className="border shadow-sm w-full h-full px-6 pt-7">
			<div className="space-y-4 sticky top-24 pb-8">
				<h2 className="text-xl font-bold">Order Summary</h2>

				<div className="space-y-2 pt-6">
					{Array.from({ length: 3 }, (_, i) => (
						<Skeleton key={i} className="w-full h-8" />
					))}
				</div>

				<Separator />
				<div className="flex justify-between items-center">
					<Skeleton className="w-full h-10" />
				</div>

				<div className="pt-4">
					<Skeleton className="w-full h-28" />
				</div>
			</div>
		</div>
	);
};

export default CartOrderSummarySkeleton;

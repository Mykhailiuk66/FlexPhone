import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const CartPopoverSkeleton = () => {
	return (
		<Card className="shadow-none border-0">
			<CardHeader className="border-b py-4">
				<CardTitle>Cart</CardTitle>
				<Skeleton className="w-2/3 h-7" />
			</CardHeader>

			<CardContent className="p-6 grid gap-4 max-h-80 overflow-y-auto">
				{Array.from({ length: 3 }, (_, i) => (
					<span key={i} className="grid grid-cols-[1fr_3fr] gap-2">
						<Skeleton className="w-full h-20" />
						<Skeleton className="w-full h-20" />
					</span>
				))}
			</CardContent>

			<CardFooter className="border-t pt-2 flex-col gap-2">
				<Skeleton className="w-1/2 h-8" />
				<Skeleton className="w-full h-8" />
			</CardFooter>
		</Card>
	);
};

export default CartPopoverSkeleton;

import { fetchProducts } from "@/api/productsApi";
import { useQuery } from "@tanstack/react-query";
import HeaderSection from "@/components/home/HeaderSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products"],
		queryFn: () => fetchProducts(),
		staleTime: 1000 * 60,
	});

	useEffect(() => {
		if (isError) {
			toast({
				variant: "destructive",
				duration: 1000 * 5,
				description: "Something went wrong. Please try again later.",
			});
		}
	}, [isError]);

	return (
		<div className="container px-4 sm:px-8">
			<HeaderSection />
			<FeaturedProducts products={data?.products} isLoading={isLoading} />
		</div>
	);
}

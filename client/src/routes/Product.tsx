import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

import ProductImgCarousel from "@/components/product/ProductImgCarousel";
import { fetchProduct } from "@/api/productsApi";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import ProductDescription from "@/components/product/ProductDescription";

const Product = () => {
	const { toast } = useToast();
	const { productId, variantId } = useParams();
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["product", productId],
		queryFn: () => fetchProduct(productId!),
		staleTime: 1000 * 60,
		enabled: !!productId,
	});

	const variant = product?.variants.find(
		(variant) => variant._id === variantId
	);

	useEffect(() => {
		let message = "Product not found";
		if (isError) {
			message = "Something went wrong. Please try again later.";
		}

		if (!variant && !isLoading) {
			toast({
				variant: "destructive",
				duration: 1000 * 5,
				description: message,
			});
		}
	}, [isError, isLoading, toast, variant]);

	if (isLoading || isError || !product || !variant) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 sm:gap-10 md:gap-20 items-start w-full md:w-5/6 mx-auto p-6 md:p-12 pb-10 lg:pt-20 shadow-2xl h-full lg:min-h-[90vh] lg:h-fit">
			<ProductImgCarousel
				images={variant!.images.concat(product?.defaultImages)}
			/>

			<ProductDescription product={product} variantId={variantId!} />
		</div>
	);
};

export default Product;

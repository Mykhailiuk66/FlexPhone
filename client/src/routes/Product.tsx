import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";

import ProductImgCarousel from "@/components/product/ProductImgCarousel";
import VariantButton from "@/components/product/VariantButton";
import SpecificationsList from "@/components/product/SpecificationList";
import { fetchProduct } from "@/api/productsApi";
import { formatAttributes } from "@/utils/utils";
import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect } from "react";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { CartContext } from "@/store/cart-context";

const Product = () => {
	const { toast } = useToast();
	const { addCartItem } = useContext(CartContext);
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
				duration: 1000 * 60,
				description: message,
			});
		}
	}, [isError, isLoading, toast, variant]);

	const handleAddToCart = () => {
		addCartItem(product!, variant!._id);
	};

	if (isLoading || isError || !product || !variant) {
		return <ProductSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 sm:gap-10 md:gap-20 items-start w-full md:w-5/6 mx-auto p-6 md:p-12 pb-10 lg:pt-20 shadow-2xl h-full lg:min-h-[90vh] lg:h-fit">
			<ProductImgCarousel
				images={variant!.images.concat(product?.defaultImages)}
			/>

			<div className="grid gap-4">
				<div className="ml-1">
					<h1 className="text-3xl font-bold">{product?.name}</h1>
					<p className="text-muted-foreground">
						{formatAttributes(variant!.attributes)}
					</p>

					<div className="flex items-center gap-2 flex-wrap mt-4">
						{product?.variants.map((variant) => (
							<VariantButton
								key={variant._id}
								productId={product._id}
								variantId={variant._id}
								isSelected={variantId === variant._id}
							>
								{formatAttributes(variant.attributes)}
							</VariantButton>
						))}
					</div>
				</div>

				<div className="shadow-md rounded-lg p-4 text-pretty">
					<p>{product?.description}</p>
				</div>

				<div className="grid gap-2 mt-4 shadow-md rounded-lg p-4 ">
					<h3 className="text-lg font-semibold">Specifications</h3>
					<SpecificationsList
						specifications={product?.characteristics}
					/>
				</div>

				<div className="flex items-center justify-between p-4 pt-6 h-auto md:h-20 justify-items-end">
					<span className="text-3xl font-bold">
						${variant!.price}
					</span>
					<Button size="lg" onClick={handleAddToCart}>
						Add to Cart
						<RiShoppingCart2Line className="ml-2 h-5 w-6" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Product;

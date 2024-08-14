import OrderAccordionItem from "@/components/orders/OrdersList";
import { Accordion } from "@/components/ui/accordion";

const orders = [
	{
		id: "ad21Sddsad21dasvcc2",
		date: "2023-06-15",
		total: 999.99,
		status: "delivered",
		items: [
			{
				id: 1,
				image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
				title: "iPhone 14 Pro",
				price: 999.99,
				quantity: 1,
			},
			{
				id: 2,
				image: "https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
				title: "AirPods Pro",
				price: 249.99,
				quantity: 1,
			},
		],
	},
	{
		id: "dsamdoc239c2mxcSNCDOCUc83naeoclsdc",
		date: "2023-05-30",
		total: 799.99,
		status: "shipped",
		items: [
			{
				id: 3,
				image: "https://www.abanista.com/wp-content/uploads/2022/08/15.jpg",
				title: "Samsung Galaxy S23",
				price: 799.99,
				quantity: 1,
			},
		],
	},
	{
		id: "2dSAJDc2j89cmejacscdas",
		date: "2023-04-20",
		total: 1199.98,
		status: "pending",
		items: [
			{
				id: 4,
				image: "https://www.abanista.com/wp-content/uploads/2022/08/15.jpg",
				title: "Google Pixel 7 Pro",
				price: 899.99,
				quantity: 1,
			},
			{
				id: 5,
				image: "https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
				title: "Pixel Buds Pro",
				price: 299.99,
				quantity: 1,
			},
		],
	},
];

const Orders = () => {
	return (
		<div className="container mx-auto py-8 shadow-2xl min-h-[93vh]">
			<h1 className="text-3xl font-bold mb-6 ml-4">My Orders</h1>
			<div>
				<Accordion type="single" collapsible>
					{orders.map((order) => (
						<OrderAccordionItem key={order.id} order={order} />
					))}
				</Accordion>
			</div>
		</div>
	);
};

export default Orders;

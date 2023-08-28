import { Button } from "@/components/ui/button";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="container w-full min-h-[calc(100vh-9rem)] pt-[24%] sm:pt-[8%] pb-10">
			<div className="text-center space-y-4 ">
				<FiAlertTriangle className="mx-auto h-20 w-20 text-primary" />
				<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Oops, page not found!
				</h1>
				<p className="text-muted-foreground">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Button asChild>
					<Link to="/">Go to Homepage</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;

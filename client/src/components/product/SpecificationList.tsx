import SpecificationItem from "./SpecificationItem";

export interface SpecificationsListProps {
	specifications: Record<string, string>;
}

const SpecificationsList = ({ specifications }: SpecificationsListProps) => {
	return (
		<div className="grid grid-cols-2 gap-3">
			{Object.entries(specifications).map(([key, value]) => (
				<SpecificationItem key={key} label={key}>
					{value}
				</SpecificationItem>
			))}
		</div>
	);
};

export default SpecificationsList;

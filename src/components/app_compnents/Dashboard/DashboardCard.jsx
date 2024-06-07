import PropTypes from "prop-types";
import Counter from "../Common/Counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardCard = ({ title, icon, num }) => {
  return (
    <div className="">
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Counter end={num}/></div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
    </div>
  );
};
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  num: PropTypes.number.isRequired,
  percent: PropTypes.string.isRequired,
  arrow: PropTypes.string.isRequired,
  cardimg: PropTypes.string.isRequired,
};

export default DashboardCard;
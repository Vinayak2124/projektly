import React, { useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircledIcon, HomeIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserSubcription, upgradeUserSubcription } from "../../Redux/Subscription/Action";

const UpgradeSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search)
    const paymentId = queryParams.get("payment_id");
    const planType = queryParams.get("planType")

    useEffect(() => {
        dispatch(upgradeUserSubcription(planType))
        dispatch(getUserSubcription())
    })
  // Example dynamic values (replace with real data / redux / props)
  const plan = {
    name: "Pro Plan",
    startDate: "17 Feb 2026",
    endDate: "17 Mar 2026",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl border">
        <CardContent className="p-8 space-y-6">

          {/* Success Icon */}
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircledIcon className="w-16 h-16 text-green-500" />
            <h1 className="text-2xl font-semibold">
              Upgrade Successful 🎉
            </h1>
            <p className="text-gray-500 text-sm">
              Your subscription has been activated successfully.
            </p>
          </div>

          {/* Plan Details */}
          <div className="border rounded-xl p-4 space-y-3 bg-white">
            <DetailRow label="Plan Name" value={plan.name} />
            <DetailRow label="Start Date" value={plan.startDate} />
            <DetailRow label="End Date" value={plan.endDate} />
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 cursor-pointer justify-center"
          >
            <HomeIcon />
            Go To Home
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

/* Reusable Row Component */
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default UpgradeSuccess;

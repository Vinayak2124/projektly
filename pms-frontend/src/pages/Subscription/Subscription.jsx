import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { createPayment } from "../../Redux/Payment/Action";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started",
    projects: "Only 3 Projects",
    planType: "FREE",
    highlight: false,
  },
  {
    name: "Monthly",
    price: "₹120",
    description: "For growing teams",
    projects: "Up to 6 Projects",
    planType: "MONTHLY",
    highlight: false,
  },
  {
    name: "Annually",
    price: "₹900",
    description: "Best value for professionals",
    projects: "Unlimited Projects",
    planType: "ANNUALLY",
    highlight: true,
  },
];

const features = [
  "Email Invitations",
  "Create and Assign tasks",
  "Project Comments",
  "Live Team Chat",
];

const Subscription = () => {
  const dispatch = useDispatch();

  const handleUpgrade = (planType) => {
    dispatch(createPayment({ planType }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Choose Your Plan
          </h1>
          <p className="text-slate-600">
            Simple pricing for individuals & teams
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                ${
                  plan.highlight
                    ? "border-primary shadow-md scale-[1.02]"
                    : ""
                } bg-white`}
            >
              <CardContent className="p-6 flex flex-col h-full">

                {/* Plan Header */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <p className="text-slate-500 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-3xl font-bold">{plan.price}</p>
                  <p className="text-sm text-slate-500">
                    {plan.name === "Monthly"
                      ? "per month"
                      : plan.name === "Annually"
                      ? "per year"
                      : "forever"}
                  </p>
                </div>

                {/* Projects Limit */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-primary">
                    {plan.projects}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-2 mb-6">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="text-sm text-slate-600"
                    >
                      ✔ {feature}
                    </div>
                  ))}

                  {plan.highlight && (
                    <div className="text-sm text-slate-600">
                      ✔ Priority Support
                    </div>
                  )}
                </div>

                {/* Button */}
                <Button
                  onClick={() => handleUpgrade(plan.planType)}
                  variant={plan.highlight ? "default" : "outline"}
                  className="w-full rounded-xl"
                >
                  {plan.name === "Free"
                    ? "Get Started"
                    : "Upgrade Now"}
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

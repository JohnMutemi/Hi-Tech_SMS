import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "KSh 5,000",
    period: "/month",
    description: "Perfect for small schools getting started",
    features: [
      "Up to 200 students",
      "5 admin users",
      "Basic attendance tracking",
      "Grade management",
      "Parent communication",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "KSh 15,000",
    period: "/month",
    description: "Ideal for growing schools with advanced needs",
    features: [
      "Up to 1,000 students",
      "Unlimited admin users",
      "Advanced analytics",
      "Financial management",
      "SMS notifications",
      "Mobile app access",
      "Priority support",
      "Custom reports",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large institutions with complex requirements",
    features: [
      "Unlimited students",
      "Multi-campus support",
      "Custom integrations",
      "Advanced security",
      "Dedicated support",
      "Training & onboarding",
      "Custom development",
      "SLA guarantee",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your school. All plans include a 30-day free trial with no setup fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? "ring-2 ring-red-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
                size="lg"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We offer tailored packages for unique requirements.
          </p>
          <Button variant="outline" size="lg">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import { Button } from "@/components/ui/button"
import { Check, X, HelpCircle } from "lucide-react"

const faqData = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees for any of our plans. We believe in transparent pricing with no hidden costs.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-PESA, bank transfers, credit cards, and other local payment methods popular in Kenya.",
  },
  {
    question: "Do you offer discounts for multiple schools?",
    answer:
      "Yes, we offer volume discounts for educational groups managing multiple schools. Contact our sales team for custom pricing.",
  },
  {
    question: "What happens if I exceed my student limit?",
    answer:
      "We'll notify you when you're approaching your limit. You can either upgrade your plan or we'll automatically adjust your billing for the additional students.",
  },
  {
    question: "Is training included?",
    answer:
      "Yes, all plans include basic training materials and video tutorials. Professional and Enterprise plans include live training sessions.",
  },
]

const comparisonFeatures = [
  { feature: "Student Management", starter: true, professional: true, enterprise: true },
  { feature: "Teacher Management", starter: true, professional: true, enterprise: true },
  { feature: "Basic Attendance", starter: true, professional: true, enterprise: true },
  { feature: "Grade Management", starter: true, professional: true, enterprise: true },
  { feature: "Parent Communication", starter: true, professional: true, enterprise: true },
  { feature: "Financial Management", starter: false, professional: true, enterprise: true },
  { feature: "Advanced Analytics", starter: false, professional: true, enterprise: true },
  { feature: "SMS Notifications", starter: false, professional: true, enterprise: true },
  { feature: "Mobile App Access", starter: false, professional: true, enterprise: true },
  { feature: "Custom Reports", starter: false, professional: true, enterprise: true },
  { feature: "API Access", starter: false, professional: false, enterprise: true },
  { feature: "Multi-Campus Support", starter: false, professional: false, enterprise: true },
  { feature: "Custom Integrations", starter: false, professional: false, enterprise: true },
  { feature: "Dedicated Support", starter: false, professional: false, enterprise: true },
  { feature: "SLA Guarantee", starter: false, professional: false, enterprise: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Choose the perfect plan for your school. All plans include a 30-day free trial with no setup fees. Scale
              up or down as your needs change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Compare All Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <PricingSection />

      {/* Feature Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Detailed Feature Comparison</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare all features across our plans to find the perfect fit for your school's needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {item.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.professional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers. If you can't find what you're looking for, contact our support team.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline" size="lg">
              Contact Support Team
            </Button>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-xl text-green-100 mb-8">
              We're confident you'll love EduManage. If you're not completely satisfied within the first 30 days, we'll
              refund your money, no questions asked.
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Risk-Free Trial
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

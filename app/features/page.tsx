import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturesSection } from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

const featureCategories = [
  {
    title: "Academic Management",
    description: "Complete tools for managing curriculum, classes, and academic activities",
    features: [
      "Class and section management",
      "Subject allocation and timetabling",
      "Automated timetable generation",
      "Academic calendar management",
      "Curriculum planning and tracking",
      "Exam scheduling and management",
    ],
  },
  {
    title: "Student Information System",
    description: "Comprehensive student data management and tracking",
    features: [
      "Student enrollment and admission",
      "Digital student profiles",
      "Academic progress tracking",
      "Attendance monitoring",
      "Disciplinary record management",
      "Health and medical records",
    ],
  },
  {
    title: "Financial Management",
    description: "Complete fee management and financial tracking system",
    features: [
      "Fee structure configuration",
      "Automated invoice generation",
      "Payment tracking and receipts",
      "M-PESA integration",
      "Financial reporting and analytics",
      "Scholarship and discount management",
    ],
  },
  {
    title: "Communication Hub",
    description: "Seamless communication between all stakeholders",
    features: [
      "SMS and email notifications",
      "Parent-teacher messaging",
      "Announcement system",
      "Event notifications",
      "Emergency alerts",
      "Multi-language support",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Modern Schools
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Discover how our comprehensive suite of features can transform your school's operations, improve
              efficiency, and enhance the educational experience for everyone.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              Try All Features Free
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <FeaturesSection />

      {/* Detailed Feature Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Detailed Feature Breakdown</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore each category of features in detail and see how they work together to create a seamless school
              management experience.
            </p>
          </div>

          <div className="space-y-16">
            {featureCategories.map((category, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{category.description}</p>
                  <div className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6" variant="outline">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <img
                      src={`/placeholder.svg?height=400&width=600`}
                      alt={`${category.title} interface`}
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with the tools and services you already use to create a unified ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "M-PESA", logo: "/placeholder.svg?height=80&width=120", description: "Mobile payments" },
              { name: "Zoom", logo: "/placeholder.svg?height=80&width=120", description: "Video conferencing" },
              { name: "Google Workspace", logo: "/placeholder.svg?height=80&width=120", description: "Email & docs" },
              { name: "Microsoft Teams", logo: "/placeholder.svg?height=80&width=120", description: "Collaboration" },
              { name: "Stripe", logo: "/placeholder.svg?height=80&width=120", description: "Online payments" },
              { name: "Flutterwave", logo: "/placeholder.svg?height=80&width=120", description: "Payment gateway" },
              { name: "SMS Gateway", logo: "/placeholder.svg?height=80&width=120", description: "Bulk SMS" },
              { name: "Email Services", logo: "/placeholder.svg?height=80&width=120", description: "Email delivery" },
            ].map((integration, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm text-center border hover:shadow-md transition-shadow"
              >
                <img
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  className="w-20 h-12 mx-auto mb-3 object-contain"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Experience All Features?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how our comprehensive feature set can transform your school.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-500">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

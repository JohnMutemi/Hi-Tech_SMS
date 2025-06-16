import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart3,
  MessageSquare,
  Shield,
  Smartphone,
  Clock,
  FileText,
  CreditCard,
  Bell,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "User Management",
    description:
      "Comprehensive role-based access for admins, teachers, students, and parents with secure authentication.",
  },
  {
    icon: BookOpen,
    title: "Academic Management",
    description:
      "Manage classes, subjects, timetables, and curriculum with automated scheduling and conflict resolution.",
  },
  {
    icon: Calendar,
    title: "Attendance Tracking",
    description: "Real-time attendance monitoring with automated reports and parent notifications.",
  },
  {
    icon: BarChart3,
    title: "Grading & Analytics",
    description: "Automated grading system with detailed analytics and performance tracking for students and classes.",
  },
  {
    icon: DollarSign,
    title: "Financial Management",
    description:
      "Complete fee management with invoicing, payment tracking, and integration with M-PESA and other payment gateways.",
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description: "Internal messaging, SMS alerts, email notifications, and parent-teacher communication portal.",
  },
  {
    icon: FileText,
    title: "E-Learning Platform",
    description: "Upload study materials, create quizzes, assignments, and integrate with video conferencing tools.",
  },
  {
    icon: Shield,
    title: "Multi-Tenant Security",
    description: "Secure multi-school architecture with data isolation and role-based permissions.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Native mobile applications for students, parents, and teachers with offline capabilities.",
  },
  {
    icon: Clock,
    title: "Timetable Management",
    description: "Automated timetable generation with conflict detection and resource optimization.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description:
      "Seamless integration with local and international payment providers including M-PESA, Stripe, and Flutterwave.",
  },
  {
    icon: Bell,
    title: "Notifications & Alerts",
    description: "Real-time notifications for important events, deadlines, and updates across all platforms.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your School
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive school management system provides all the tools you need to streamline operations, improve
            communication, and enhance the educational experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

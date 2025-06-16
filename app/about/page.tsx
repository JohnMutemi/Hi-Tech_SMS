import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Wanjiku",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Former education administrator with 15+ years experience in school management.",
  },
  {
    name: "David Kimani",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Software architect specializing in educational technology and scalable systems.",
  },
  {
    name: "Grace Achieng",
    role: "Head of Product",
    image: "/placeholder.svg?height=300&width=300",
    bio: "UX expert focused on creating intuitive educational software solutions.",
  },
  {
    name: "Michael Omondi",
    role: "Head of Customer Success",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dedicated to ensuring schools get maximum value from our platform.",
  },
]

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to provide cutting-edge solutions for modern educational challenges.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand the unique needs of educators, students, and parents in the learning journey.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product development to customer service.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of collaboration between schools, families, and communities.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transforming Education Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Technology
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're on a mission to empower schools across Kenya with comprehensive management solutions that streamline
              operations, enhance communication, and improve educational outcomes for every student.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                Get Started Today
              </Button>
              <Button size="lg" variant="outline">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, EduManage was born from a simple observation: schools in Kenya were struggling with
                  outdated, fragmented systems that made administration complex and time-consuming.
                </p>
                <p>
                  Our founders, having worked directly in educational institutions, understood the daily challenges
                  faced by administrators, teachers, students, and parents. They envisioned a comprehensive platform
                  that would bring all school management functions under one roof.
                </p>
                <p>
                  Today, we're proud to serve over 500 schools across Kenya, helping them manage everything from student
                  enrollment and attendance to financial management and parent communication.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">500+</div>
                  <div className="text-sm text-gray-600">Schools Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">50K+</div>
                  <div className="text-sm text-gray-600">Students Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl p-8">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team working"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our school communities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines deep educational expertise with cutting-edge technology skills.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Your School?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of schools already using EduManage to streamline their operations and improve educational
            outcomes.
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

import { Button } from "@/components/ui/button"
import { Play, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                All-In-One{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                  School Management
                </span>{" "}
                Software
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Best School Management System with all essential functionalities required to manage your school
                efficiently and automate everything remotely.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              {[
                "Multi-tenant architecture for multiple schools",
                "Complete student & staff management",
                "Automated grading and attendance tracking",
                "Financial management with payment integration",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-lg px-8 py-3"
                asChild
              >
                <Link href="/demo">Try Free Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2" asChild>
                <Link href="/video-demo" className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by 500+ schools across Kenya</p>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Schools</div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm">Students</div>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Dashboard */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">Dashboard</div>
                </div>

                {/* Dashboard Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">89</div>
                      <div className="text-sm text-gray-600">Teachers</div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-end space-x-2 h-20">
                      {[40, 60, 30, 80, 50, 70, 90].map((height, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-t from-red-500 to-pink-500 rounded-t flex-1"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Student Performance</div>
                  </div>
                </div>
              </div>

              {/* Mobile App Preview */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-4 w-32 transform -rotate-12">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-lg p-3 text-white text-center">
                  <div className="text-lg font-bold">95%</div>
                  <div className="text-xs">Attendance</div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl transform -rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

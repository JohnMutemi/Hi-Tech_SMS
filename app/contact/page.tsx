import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+254 703 367213",
    availability: "Mon-Fri, 8AM-6PM EAT",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "support@edumanage.co.ke",
    availability: "24/7 response",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team in real-time",
    contact: "Available on website",
    availability: "Mon-Fri, 8AM-8PM EAT",
  },
  {
    icon: MapPin,
    title: "Office Visit",
    description: "Visit our office for in-person support",
    contact: "Nairobi, Kenya",
    availability: "By appointment only",
  },
]

const officeLocations = [
  {
    city: "Nairobi",
    address: "ABC Place, Waiyaki Way",
    phone: "+254 703 367213",
    email: "nairobi@edumanage.co.ke",
    isMain: true,
  },
  {
    city: "Mombasa",
    address: "Nyali Centre, Links Road",
    phone: "+254 704 367213",
    email: "mombasa@edumanage.co.ke",
    isMain: false,
  },
  {
    city: "Kisumu",
    address: "Mega Plaza, Oginga Odinga Street",
    phone: "+254 705 367213",
    email: "kisumu@edumanage.co.ke",
    isMain: false,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Have questions about EduManage? Need help getting started? Our friendly support team is here to help.
              Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the contact method that works best for you. We're committed to providing excellent support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="font-semibold text-gray-900 mb-2">{method.contact}</p>
                  <p className="text-sm text-gray-500">{method.availability}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours. For urgent matters, please call us
                directly.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>

                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <Input id="schoolName" placeholder="Enter your school name" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} required />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Offices</h2>
              <p className="text-gray-600 mb-8">
                Visit us at any of our locations across Kenya. We're always happy to meet in person and discuss how
                EduManage can help your school.
              </p>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className={office.isMain ? "ring-2 ring-red-500" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {office.city} {office.isMain && <span className="text-red-500 text-sm">(Main Office)</span>}
                          </h3>
                          <p className="text-gray-600 mb-2">{office.address}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{office.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Business Hours */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Dedicated Support Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced support team is here to help you succeed with EduManage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Implementation Team</h3>
                <p className="text-gray-600">
                  Get help setting up your school and migrating your data with our implementation specialists.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Headphones className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h3>
                <p className="text-gray-600">
                  Resolve technical issues quickly with our knowledgeable technical support team.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Training Team</h3>
                <p className="text-gray-600">
                  Learn how to use EduManage effectively with personalized training sessions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

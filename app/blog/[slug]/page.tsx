"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, ArrowLeft, Share2, ThumbsUp, MessageCircle } from "lucide-react"
import Link from "next/link"
import { faker } from "@faker-js/faker"

// Same data as blog page for consistency
const schoolTopics = [
  "Student Information Systems",
  "Digital Transformation in Education",
  "School Fee Management",
  "Parent-Teacher Communication",
  "Attendance Tracking Systems",
  "Academic Performance Analytics",
  "School Safety and Security",
  "E-Learning Platforms",
  "Timetable Management",
  "School Administration",
  "Educational Technology",
  "Student Engagement",
  "School Finance Management",
  "Data Privacy in Schools",
  "Mobile Learning Solutions",
]

const categories = [
  "Education Technology",
  "Digital Transformation",
  "Financial Management",
  "Communication",
  "Security",
  "Business",
  "Analytics",
  "Mobile Learning",
  "Administration",
]

const authors = [
  "Dr. Sarah Wanjiku",
  "Prof. David Kimani",
  "Grace Achieng",
  "Michael Omondi",
  "Dr. Jane Muthoni",
  "Peter Kariuki",
  "Mary Njeri",
  "John Ochieng",
  "Dr. Ruth Wambui",
  "Samuel Kiprotich",
  "Faith Akinyi",
  "Daniel Mwangi",
]

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
  tags: string[]
  likes: number
  comments: number
}

function generateFullBlogContent(topic: string): string {
  const sections = [
    {
      heading: "Introduction",
      content: `In today's rapidly evolving educational landscape, ${topic.toLowerCase()} has become increasingly important for schools across Kenya. This comprehensive guide explores the key aspects, benefits, and implementation strategies that can transform your educational institution.

The digital transformation of education has accelerated significantly, especially in the post-pandemic era. Schools that embrace modern ${topic.toLowerCase()} solutions are better positioned to provide quality education, streamline operations, and enhance student outcomes.`,
    },
    {
      heading: `Understanding ${topic}`,
      content: `${topic} encompasses various tools, strategies, and methodologies designed to improve educational delivery and administrative efficiency. For Kenyan schools, this means adopting solutions that are not only technologically advanced but also culturally relevant and economically viable.

Key components include:
• Comprehensive data management systems
• Real-time communication platforms
• Automated administrative processes
• Performance tracking and analytics
• Mobile-friendly interfaces for all stakeholders

The implementation of effective ${topic.toLowerCase()} requires careful planning, stakeholder buy-in, and ongoing support to ensure successful adoption across the entire school community.`,
    },
    {
      heading: "Benefits for Kenyan Schools",
      content: `Schools that have successfully implemented ${topic.toLowerCase()} report significant improvements in various areas:

**Operational Efficiency**: Automated processes reduce manual workload by up to 60%, allowing staff to focus on core educational activities rather than administrative tasks.

**Enhanced Communication**: Real-time communication between teachers, students, and parents improves engagement and keeps everyone informed about important updates and progress.

**Data-Driven Decisions**: Access to comprehensive analytics enables administrators to make informed decisions about curriculum, resource allocation, and student support services.

**Cost Reduction**: While initial investment may be significant, schools typically see 30-40% reduction in operational costs within the first two years of implementation.

**Improved Student Outcomes**: Schools report average improvement of 15-20% in student performance metrics when using integrated ${topic.toLowerCase()} solutions.`,
    },
    {
      heading: "Implementation Strategy",
      content: `Successful implementation of ${topic.toLowerCase()} requires a structured approach:

**Phase 1: Assessment and Planning (Months 1-2)**
- Conduct comprehensive needs assessment
- Identify key stakeholders and form implementation team
- Develop detailed project timeline and budget
- Select appropriate technology solutions

**Phase 2: Infrastructure Setup (Months 2-3)**
- Install necessary hardware and software
- Configure systems according to school requirements
- Establish data security protocols
- Create backup and recovery procedures

**Phase 3: Training and Onboarding (Months 3-4)**
- Train administrators, teachers, and support staff
- Develop user manuals and documentation
- Conduct pilot testing with select groups
- Gather feedback and make necessary adjustments

**Phase 4: Full Deployment (Months 4-6)**
- Roll out system to entire school community
- Monitor performance and user adoption
- Provide ongoing support and troubleshooting
- Evaluate success metrics and ROI`,
    },
    {
      heading: "Challenges and Solutions",
      content: `While implementing ${topic.toLowerCase()}, schools often face several challenges:

**Technology Adoption Resistance**: Some staff members may be hesitant to adopt new technologies. Solution: Provide comprehensive training, highlight benefits, and offer ongoing support.

**Budget Constraints**: Limited financial resources can hinder implementation. Solution: Consider phased implementation, seek grants, or explore cost-effective solutions designed for developing markets.

**Infrastructure Limitations**: Poor internet connectivity or inadequate hardware. Solution: Work with local ISPs, consider offline capabilities, and invest in reliable infrastructure.

**Data Security Concerns**: Protecting sensitive student and school data. Solution: Implement robust security measures, regular backups, and staff training on data protection.

**Change Management**: Resistance to changing established processes. Solution: Involve stakeholders in planning, communicate benefits clearly, and provide adequate support during transition.`,
    },
    {
      heading: "Best Practices",
      content: `To maximize the benefits of ${topic.toLowerCase()}, consider these best practices:

**Start Small**: Begin with pilot programs before full-scale implementation to identify potential issues and refine processes.

**Involve All Stakeholders**: Ensure teachers, students, parents, and administrators are involved in the planning and implementation process.

**Provide Ongoing Training**: Technology evolves rapidly, so continuous training ensures users can leverage new features and capabilities.

**Monitor and Evaluate**: Regularly assess system performance, user satisfaction, and achievement of objectives to make necessary improvements.

**Maintain Data Quality**: Establish procedures for data entry, validation, and maintenance to ensure system reliability and accuracy.

**Plan for Scalability**: Choose solutions that can grow with your school and accommodate future needs and expansion.`,
    },
    {
      heading: "Future Outlook",
      content: `The future of ${topic.toLowerCase()} in Kenyan schools looks promising, with several emerging trends:

**Artificial Intelligence Integration**: AI-powered tools will provide personalized learning experiences and predictive analytics for student performance.

**Mobile-First Approach**: With increasing smartphone penetration, mobile-optimized solutions will become the primary interface for school management.

**Cloud-Based Solutions**: Cloud computing will enable smaller schools to access enterprise-level capabilities without significant infrastructure investment.

**Integration with National Systems**: Better integration with government education systems will streamline reporting and compliance requirements.

**Enhanced Parent Engagement**: Advanced communication tools will strengthen the partnership between schools and families.

Schools that begin their digital transformation journey now will be better positioned to leverage these future innovations and provide superior educational experiences.`,
    },
    {
      heading: "Conclusion",
      content: `${topic} represents a significant opportunity for Kenyan schools to improve educational outcomes, streamline operations, and better serve their communities. While implementation challenges exist, the benefits far outweigh the costs for schools committed to providing quality education.

Success requires careful planning, stakeholder engagement, and ongoing commitment to continuous improvement. Schools that embrace these technologies today will be the educational leaders of tomorrow, better equipped to prepare students for an increasingly digital world.

The journey toward effective ${topic.toLowerCase()} implementation may seem daunting, but with the right approach, support, and tools, any school can successfully transform its operations and enhance its educational impact.

For schools ready to begin this transformation, the time to act is now. The future of education in Kenya depends on our collective commitment to embracing innovation while maintaining our focus on student success and community development.`,
    },
  ]

  return sections.map((section) => `## ${section.heading}\n\n${section.content}`).join("\n\n")
}

function generateBlogPost(slug: string): BlogPost {
  // Use slug to seed faker for consistent content
  faker.seed(slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0))

  const topic = faker.helpers.arrayElement(schoolTopics)
  const title = `${faker.helpers.arrayElement([
    "The Complete Guide to",
    "How to Implement",
    "Best Practices for",
    "Understanding",
    "Transforming Education with",
    "The Future of",
    "Mastering",
    "Essential Strategies for",
  ])} ${topic}`

  const excerpt = `Discover how ${topic.toLowerCase()} can transform your school's operations and improve educational outcomes. This comprehensive guide covers implementation strategies, best practices, and real-world examples from successful Kenyan schools.`

  const content = generateFullBlogContent(topic)

  const imageKeywords = ["school", "education", "classroom", "students", "learning", "teacher", "books", "technology"]
  const randomKeyword = faker.helpers.arrayElement(imageKeywords)
  const imageUrl = `https://source.unsplash.com/1200x600/?${randomKeyword},education`

  const tags = faker.helpers.arrayElements(
    [
      "School Management",
      "Education Technology",
      "Digital Transformation",
      "Kenya Education",
      "Student Success",
      "Teacher Training",
      "Parent Engagement",
      "Academic Excellence",
      "School Administration",
      "Educational Innovation",
    ],
    { min: 3, max: 6 },
  )

  return {
    id: slug,
    title,
    excerpt,
    content,
    author: faker.helpers.arrayElement(authors),
    date: faker.date.between({ from: "2024-01-01", to: new Date() }).toISOString().split("T")[0],
    category: faker.helpers.arrayElement(categories),
    image: imageUrl,
    readTime: `${faker.number.int({ min: 8, max: 15 })} min read`,
    tags,
    likes: faker.number.int({ min: 12, max: 156 }),
    comments: faker.number.int({ min: 3, max: 24 }),
  }
}

function generateRelatedPosts(currentSlug: string): BlogPost[] {
  const relatedSlugs = [
    "digital-classroom-management",
    "student-engagement-strategies",
    "parent-teacher-communication",
    "educational-technology-trends",
  ]
    .filter((slug) => slug !== currentSlug)
    .slice(0, 3)

  return relatedSlugs.map((slug) => generateBlogPost(slug))
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      setIsLoading(true)
      // Simulate loading time
      setTimeout(() => {
        const blogPost = generateBlogPost(slug)
        const related = generateRelatedPosts(slug)
        setPost(blogPost)
        setRelatedPosts(related)
        setIsLoading(false)
      }, 500)
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>← Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-red-500 hover:text-red-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Meta */}
        <div className="mb-8">
          <Badge className="bg-red-500 text-white mb-4">{post.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 lg:h-96 object-cover rounded-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=400&width=800"
            }}
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }

            if (paragraph.includes("**") && paragraph.includes("**:")) {
              // Handle bold sections with descriptions
              const parts = paragraph.split("\n")
              return (
                <div key={index} className="mb-6">
                  {parts.map((part, partIndex) => {
                    if (part.includes("**") && part.includes("**:")) {
                      const [boldText, description] = part.split("**:")
                      return (
                        <p key={partIndex} className="mb-3">
                          <strong className="text-gray-900">{boldText.replace(/\*\*/g, "")}:</strong>
                          <span className="text-gray-700">{description}</span>
                        </p>
                      )
                    }
                    return part ? (
                      <p key={partIndex} className="text-gray-700 leading-relaxed mb-3">
                        {part}
                      </p>
                    ) : null
                  })}
                </div>
              )
            }

            if (paragraph.includes("•")) {
              // Handle bullet points
              const items = paragraph.split("•").filter((item) => item.trim())
              return (
                <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.trim()}</li>
                  ))}
                </ul>
              )
            }

            return (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
              <p className="text-gray-600 mt-1">
                Educational technology expert with over 10 years of experience in transforming Kenyan schools through
                innovative digital solutions. Passionate about improving educational outcomes through technology.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <p className="text-gray-600">Continue reading about school management and educational technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <Link href={`/blog/${relatedPost.id}`}>
                  <div className="relative">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=500"
                      }}
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">{relatedPost.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{relatedPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{relatedPost.excerpt}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { faker } from "@faker-js/faker"
import Link from "next/link"

// Same data as before...
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

const schoolTitleTemplates = [
  "How to Improve {topic} in Modern Schools",
  "The Complete Guide to {topic}",
  "10 Best Practices for {topic}",
  "Why {topic} Matters for Student Success",
  "Implementing {topic}: A Step-by-Step Guide",
  "The Future of {topic} in Kenyan Schools",
  "Common Challenges in {topic} and How to Solve Them",
  "ROI of {topic}: What Schools Need to Know",
  "Digital Solutions for {topic}",
  "Transforming {topic} with Technology",
]

const schoolExcerptTemplates = [
  "Discover how modern technology is revolutionizing {topic} and improving educational outcomes for students across Kenya.",
  "Learn the essential strategies and best practices for implementing effective {topic} in your school environment.",
  "Explore the latest trends and innovations in {topic} that are helping schools streamline operations and enhance learning.",
  "A comprehensive analysis of how {topic} can transform your school's efficiency and student satisfaction.",
  "Understand the key benefits and implementation strategies for successful {topic} in educational institutions.",
  "Find out how leading schools are using {topic} to improve student engagement and academic performance.",
  "Essential insights into {topic} that every school administrator should know to stay competitive.",
  "Practical tips and real-world examples of successful {topic} implementation in Kenyan schools.",
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
  id: number
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
  featured: boolean
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function generateBlogPost(id: number, featured = false): BlogPost {
  const topic = faker.helpers.arrayElement(schoolTopics)
  const titleTemplate = faker.helpers.arrayElement(schoolTitleTemplates)
  const excerptTemplate = faker.helpers.arrayElement(schoolExcerptTemplates)

  const title = titleTemplate.replace("{topic}", topic)
  const excerpt = excerptTemplate.replace("{topic}", topic.toLowerCase())
  const slug = generateSlug(title)

  // Unsplash images related to education/schools
  const imageKeywords = ["school", "education", "classroom", "students", "learning", "teacher", "books", "technology"]
  const randomKeyword = faker.helpers.arrayElement(imageKeywords)
  const imageUrl = `https://source.unsplash.com/800x600/?${randomKeyword},education`

  return {
    id,
    slug,
    title,
    excerpt,
    author: faker.helpers.arrayElement(authors),
    date: faker.date.between({ from: "2024-01-01", to: new Date() }).toISOString().split("T")[0],
    category: faker.helpers.arrayElement(categories),
    image: imageUrl,
    readTime: `${faker.number.int({ min: 3, max: 12 })} min read`,
    featured,
  }
}

function generateBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  // Generate 1 featured post
  posts.push(generateBlogPost(1, true))

  // Generate 8 regular posts
  for (let i = 2; i <= 9; i++) {
    posts.push(generateBlogPost(i, false))
  }

  return posts
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  const loadBlogPosts = () => {
    setIsLoading(true)
    // Simulate loading time
    setTimeout(() => {
      setBlogPosts(generateBlogPosts())
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = filteredPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const allCategories = ["All Posts", ...categories]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading fresh blog content...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              EduManage{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Insights, tips, and best practices for modern school management. Stay updated with the latest trends in
              educational technology and school administration.
            </p>

            {/* Search Bar and Refresh Button */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-3 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={loadBlogPosts}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-red-500 text-white mb-4">Featured Article</Badge>
              <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
            </div>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover min-h-[300px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=400&width=600"
                      }}
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">{featuredPost.category}</Badge>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-red-500 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-red-500 font-medium">
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </div>
              </Link>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-red-500 hover:bg-red-600" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Posts")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=300&width=500"
                          }}
                        />
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">{post.category}</Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                          <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" onClick={loadBlogPosts}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate More Articles
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Updated with EduManage</h2>
          <p className="text-xl text-red-100 mb-8">
            Subscribe to our newsletter and get the latest insights on school management and educational technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="flex-1 bg-white" />
            <Button className="bg-white text-red-500 hover:bg-gray-100">Subscribe</Button>
          </div>
          <p className="text-sm text-red-100 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

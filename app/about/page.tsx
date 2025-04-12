import Image from "next/image"
import { Briefcase, Users, Award, Heart, Shield, Clock } from "lucide-react"

export const metadata = {
  title: "About Us | RideHub",
  description: "Learn more about RideHub and our mission to help you find your perfect car",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About RideHub</h1>

        <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-8">
          <Image
            src="https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=2000&auto=format&fit=crop"
            alt="RideHub Team"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="lead text-xl">
            Founded in 2020, RideHub is on a mission to revolutionize the way people find and purchase cars online.
          </p>

          <p>
            At RideHub, we believe that finding your perfect car should be an exciting journey, not a stressful chore.
            That's why we've built a platform that makes car shopping simple, transparent, and enjoyable. Whether you're
            a first-time buyer or a seasoned car enthusiast, our goal is to provide you with the tools and information
            you need to make confident decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>

          <p>
            RideHub was born out of frustration with the traditional car buying process. Our founders, all car
            enthusiasts themselves, recognized that the industry was ripe for innovation. They set out to create a
            platform that would bring transparency, convenience, and joy back to car shopping.
          </p>

          <p>
            What started as a small startup with a handful of listings has grown into a comprehensive marketplace with
            thousands of cars from trusted dealers and private sellers across the country. Despite our growth, our
            mission remains the same: to help you find the perfect car with confidence and ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-muted rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">20,000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>

            <div className="bg-muted rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">1,000+</h3>
              <p className="text-muted-foreground">Trusted Dealers</p>
            </div>

            <div className="bg-muted rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">50+</h3>
              <p className="text-muted-foreground">Industry Awards</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Customer First</h3>
                <p className="text-muted-foreground">
                  We put our customers at the center of everything we do, constantly seeking ways to improve their
                  experience.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest, clear information that helps you make informed decisions with confidence.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly exploring new technologies and ideas to make car shopping better and more efficient.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a community of car enthusiasts, buyers, and sellers who share knowledge and experiences.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>

          <p>
            RideHub is powered by a diverse team of automotive experts, technology enthusiasts, and customer experience
            specialists. We're united by our passion for cars and our commitment to creating the best car shopping
            experience possible.
          </p>

          <p>
            From our developers who build and maintain our platform to our customer support team who assist you every
            step of the way, everyone at RideHub plays a crucial role in our mission to revolutionize car shopping.
          </p>

          <div className="bg-muted rounded-xl p-8 my-8">
            <blockquote className="text-xl italic">
              "We're not just building a car marketplace; we're creating a community where people can find their perfect
              car with confidence and joy."
            </blockquote>
            <p className="font-bold mt-4">— Alex Chen, CEO & Co-founder</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Join Us on Our Journey</h2>

          <p>
            We're just getting started, and we're excited about the road ahead. Whether you're looking for your next
            car, selling your current one, or interested in joining our team, we invite you to be part of the RideHub
            community.
          </p>

          <p>Thank you for choosing RideHub. We look forward to helping you find your perfect car!</p>
        </div>
      </div>
    </div>
  )
}

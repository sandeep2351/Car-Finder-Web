import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "First-time buyer",
      image: "/images/testimonials/person1.jpg",
      content:
        "RideHub made finding my first car so easy! The filters helped me narrow down exactly what I wanted, and I found the perfect match within days.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Car enthusiast",
      image: "/images/testimonials/person2.jpg",
      content:
        "As someone who knows cars well, I appreciate the detailed information RideHub provides. The comparison feature is especially useful.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family car buyer",
      image: "/images/testimonials/person3.jpg",
      content:
        "We needed a spacious family car with specific safety features. RideHub's filtering options helped us find exactly what we needed within our budget.",
    },
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with RideHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={"/placeholder.svg?height=48&width=48"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Service to simulate testimonials API calls
// This will be replaced with actual API calls when backend is ready

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image?: string
  rating: number
  date: string
}

// Mock testimonials data
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    role: "CAS-UK Member",
    content:
      "CAS-UK has been instrumental in supporting our family during a difficult time. The transparent process and community support made all the difference. Highly recommended to all Cameroonians in the UK.",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-10-15",
  },
  {
    id: "2",
    name: "Fatima Nkomo",
    role: "Group Admin",
    content:
      "As a group admin, I appreciate how easy CAS-UK makes it to manage contributions. The system is transparent, efficient, and truly helps our members. Great initiative!",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-09-22",
  },
  {
    id: "3",
    name: "Victor Tango",
    role: "Individual Member",
    content:
      "The peace of mind knowing that my family back home is protected is invaluable. CAS-UK's mission is noble and the execution is flawless. I recommend it to everyone.",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-08-30",
  },
  {
    id: "4",
    name: "Sylvain Djoume",
    role: "CAS-UK Member",
    content:
      "CAS-UK made what seemed impossible possible. When my uncle passed away, the community rallied together and ensured he was repatriated with dignity. Forever grateful.",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-07-18",
  },
  {
    id: "5",
    name: "Abelard Nkongho",
    role: "Group Member",
    content:
      "The organization is run with integrity and transparency. Every pound is accounted for, and I trust they will be there when my family needs them. Excellent work!",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-06-10",
  },
  {
    id: "6",
    name: "Nadia Sanda",
    role: "CAS-UK Member",
    content:
      "What started as a simple idea has grown into a strong community. CAS-UK embodies the spirit of Ubuntu - we are because we are together. Beautiful initiative.",
    image: "/placeholder-user.jpg",
    rating: 5,
    date: "2024-05-25",
  },
]

// Mock success stories
export interface SuccessStory {
  id: string
  title: string
  description: string
  image?: string
  content: string
  familyName: string
  date: string
}

const mockSuccessStories: SuccessStory[] = [
  {
    id: "1",
    title: "Bringing Mr. Nkongho Home",
    description: "How the community came together to repatriate a beloved father",
    image: "/placeholder.jpg",
    content: `
      When Mr. Nkongho passed away in London after a brief illness, his family in Cameroon faced an uncertain future.
      Thanks to CAS-UK, the community rallied together and raised £10,000 in just two weeks.
      This allowed his family to arrange a dignified burial ceremony back home.
      Mr. Nkongho's daughter shared: "We couldn't have done this without CAS-UK. My father's memory is honored, and our family is at peace."
    `,
    familyName: "Nkongho Family",
    date: "2024-03-15",
  },
  {
    id: "2",
    title: "A Community's Gift",
    description: "Young student finds comfort in collective support",
    image: "/placeholder.jpg",
    content: `
      When 22-year-old Blessing lost her mother unexpectedly, she felt lost and alone.
      CAS-UK's network provided not just financial support, but emotional support as well.
      "I didn't expect the community to show up for me like this," Blessing says.
      "CAS-UK isn't just an organization; it's family. They made sure my mother came home, and that meant everything."
    `,
    familyName: "Blessing Fon",
    date: "2024-02-20",
  },
  {
    id: "3",
    title: "From Helplessness to Hope",
    description: "A family finds financial relief through collective care",
    image: "/placeholder.jpg",
    content: `
      The Sanda family, new to the UK and without extended family support, thought they couldn't afford to repatriate their grandfather.
      CAS-UK changed that. Through transparent contributions and community support, they raised the necessary funds.
      "CAS-UK gave us something we thought was lost forever - hope. Our grandfather now rests peacefully at home."
    `,
    familyName: "Sanda Family",
    date: "2024-01-10",
  },
]

// API simulation functions
export const testimonialService = {
  // Get all testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTestimonials)
      }, 500)
    })
  },

  // Get testimonials with pagination
  async getTestimonialsPaginated(page: number = 1, limit: number = 6): Promise<{ data: Testimonial[]; total: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedData = mockTestimonials.slice(start, end)
        resolve({
          data: paginatedData,
          total: mockTestimonials.length,
        })
      }, 500)
    })
  },

  // Get single testimonial
  async getTestimonialById(id: string): Promise<Testimonial | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const testimonial = mockTestimonials.find((t) => t.id === id)
        resolve(testimonial || null)
      }, 300)
    })
  },

  // Get all success stories
  async getSuccessStories(): Promise<SuccessStory[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSuccessStories)
      }, 500)
    })
  },

  // Get single success story
  async getSuccessStoryById(id: string): Promise<SuccessStory | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const story = mockSuccessStories.find((s) => s.id === id)
        resolve(story || null)
      }, 300)
    })
  },
}

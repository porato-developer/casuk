// Service to simulate contact form and newsletter API calls

export interface ContactMessage {
  id: string
  fullName: string
  email: string
  phone?: string
  topic: string
  message: string
  createdAt: string
  status: "new" | "read" | "resolved"
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
  status: "active" | "unsubscribed"
}

// Mock contact messages
const mockContactMessages: ContactMessage[] = [
  {
    id: "c1",
    fullName: "Test User",
    email: "test@example.com",
    phone: "+44-123-456-7890",
    topic: "General Inquiry",
    message: "This is a test message from a simulated contact form submission.",
    createdAt: new Date().toISOString(),
    status: "new",
  },
]

// Mock newsletter subscribers
const mockNewsletterSubscribers: NewsletterSubscriber[] = [
  {
    id: "n1",
    email: "subscriber1@example.com",
    subscribedAt: "2024-01-15",
    status: "active",
  },
  {
    id: "n2",
    email: "subscriber2@example.com",
    subscribedAt: "2024-02-20",
    status: "active",
  },
]

// Mock FAQs
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const mockFAQs: FAQ[] = [
  {
    id: "faq1",
    question: "What is CAS-UK?",
    answer:
      "CAS-UK (Cameroon Association of Solidarity) is a non-profit organization dedicated to supporting the Cameroonian community in the UK. Our primary mission is to assist families with repatriating their loved ones when they pass away, ensuring they can rest peacefully at home in Cameroon.",
    category: "About",
  },
  {
    id: "faq2",
    question: "How much does membership cost?",
    answer:
      "CAS-UK membership is completely free! Members contribute small amounts (as little as £2) when someone in the community needs support, ensuring funds are only collected when truly needed.",
    category: "Membership",
  },
  {
    id: "faq3",
    question: "Can I join if I'm not Cameroonian?",
    answer:
      "CAS-UK is primarily for members of the Cameroonian community in the UK. However, we welcome partners and supporters. Please contact us for more information about how you can help.",
    category: "Membership",
  },
  {
    id: "faq4",
    question: "How long does repatriation typically take?",
    answer:
      "The repatriation process typically takes 2-4 weeks from when funds are collected. This includes coordination with authorities, arranging transportation, and working with family in Cameroon.",
    category: "Repatriation",
  },
  {
    id: "faq5",
    question: "Is my contribution information private?",
    answer:
      "We believe in transparency. Contributions are tracked and visible within our system, but member names and details are kept confidential unless they choose to share publicly.",
    category: "Privacy",
  },
  {
    id: "faq6",
    question: "Can children be included in membership?",
    answer:
      "Yes! Children aged 3-18 can be included in membership under their parent's account. This ensures they are also covered by the repatriation benefit.",
    category: "Membership",
  },
  {
    id: "faq7",
    question: "How do I update my profile?",
    answer:
      "You can update your profile by logging into your member account. You can change your contact information, add or remove dependents, and update your payment preferences.",
    category: "Account",
  },
  {
    id: "faq8",
    question: "What if I can't contribute right now?",
    answer:
      "Contributions are voluntary and made when needed. However, to maintain active membership status, we recommend contributing at least a small amount annually to support other members.",
    category: "Contributions",
  },
]

export const contactService = {
  // Submit contact form
  async submitContactMessage(data: Omit<ContactMessage, "id" | "createdAt" | "status">): Promise<ContactMessage> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: ContactMessage = {
          ...data,
          id: `c${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: "new",
        }
        mockContactMessages.push(newMessage)
        resolve(newMessage)
      }, 800)
    })
  },

  // Get all contact messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockContactMessages)
      }, 500)
    })
  },

  // Get contact message by ID
  async getContactMessageById(id: string): Promise<ContactMessage | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const message = mockContactMessages.find((m) => m.id === id)
        resolve(message || null)
      }, 300)
    })
  },

  // Subscribe to newsletter
  async subscribeToNewsletter(email: string): Promise<NewsletterSubscriber> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if already subscribed
        const existing = mockNewsletterSubscribers.find((s) => s.email === email)
        if (existing && existing.status === "active") {
          reject(new Error("Email already subscribed"))
          return
        }

        // If previously unsubscribed, reactivate
        if (existing) {
          existing.status = "active"
          resolve(existing)
          return
        }

        // Create new subscription
        const newSubscriber: NewsletterSubscriber = {
          id: `n${Date.now()}`,
          email,
          subscribedAt: new Date().toISOString().split("T")[0],
          status: "active",
        }
        mockNewsletterSubscribers.push(newSubscriber)
        resolve(newSubscriber)
      }, 600)
    })
  },

  // Unsubscribe from newsletter
  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subscriber = mockNewsletterSubscribers.find((s) => s.email === email)
        if (subscriber) {
          subscriber.status = "unsubscribed"
          resolve(true)
        } else {
          resolve(false)
        }
      }, 300)
    })
  },

  // Get all FAQs
  async getFAQs(category?: string): Promise<FAQ[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = category ? mockFAQs.filter((f) => f.category === category) : mockFAQs
        resolve(filtered)
      }, 300)
    })
  },

  // Get FAQ by ID
  async getFAQById(id: string): Promise<FAQ | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const faq = mockFAQs.find((f) => f.id === id)
        resolve(faq || null)
      }, 200)
    })
  },

  // Get FAQ categories
  async getFAQCategories(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = Array.from(new Set(mockFAQs.map((f) => f.category)))
        resolve(categories)
      }, 200)
    })
  },
}

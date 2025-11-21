// Service to simulate donation and payment API calls

export interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  currency: "GBP" | "USD" | "EUR"
  type: "one-time" | "monthly"
  campaignId?: string
  message?: string
  createdAt: string
  status: "pending" | "completed" | "failed"
}

export interface Campaign {
  id: string
  memberName: string
  reason: string
  targetAmount: number
  currentAmount: number
  percentageComplete: number
  createdAt: string
  deadline: string
  status: "active" | "completed" | "cancelled"
}

// Mock donations
const mockDonations: Donation[] = [
  {
    id: "d1",
    donorName: "Anonymous",
    donorEmail: "anonymous@example.com",
    amount: 50,
    currency: "GBP",
    type: "one-time",
    createdAt: "2024-11-20",
    status: "completed",
  },
  {
    id: "d2",
    donorName: "Ahmed Hassan",
    donorEmail: "ahmed@example.com",
    amount: 100,
    currency: "GBP",
    type: "one-time",
    createdAt: "2024-11-19",
    status: "completed",
  },
  {
    id: "d3",
    donorName: "Fatima Nkomo",
    donorEmail: "fatima@example.com",
    amount: 25,
    currency: "GBP",
    type: "monthly",
    createdAt: "2024-11-15",
    status: "completed",
  },
]

// Mock campaigns (active repatriation cases)
const mockCampaigns: Campaign[] = [
  {
    id: "camp1",
    memberName: "James Djoume",
    reason: "Repatriation of father",
    targetAmount: 10000,
    currentAmount: 7250,
    percentageComplete: 72.5,
    createdAt: "2024-11-01",
    deadline: "2024-12-01",
    status: "active",
  },
  {
    id: "camp2",
    memberName: "Nadia Sanda",
    reason: "Repatriation of mother",
    targetAmount: 10000,
    currentAmount: 10000,
    percentageComplete: 100,
    createdAt: "2024-10-15",
    deadline: "2024-10-30",
    status: "completed",
  },
  {
    id: "camp3",
    memberName: "Victor Tango",
    reason: "Repatriation of spouse",
    targetAmount: 10000,
    currentAmount: 4500,
    percentageComplete: 45,
    createdAt: "2024-11-05",
    deadline: "2024-12-05",
    status: "active",
  },
]

// Preset donation amounts
export interface DonationOption {
  id: string
  amount: number
  label: string
  description: string
}

const donationOptions: DonationOption[] = [
  {
    id: "opt1",
    amount: 5,
    label: "Help a Little",
    description: "Make a difference with £5",
  },
  {
    id: "opt2",
    amount: 10,
    label: "Support Meaningfully",
    description: "Double the impact with £10",
  },
  {
    id: "opt3",
    amount: 25,
    label: "Make a Real Difference",
    description: "Contribute £25 towards a repatriation",
  },
  {
    id: "opt4",
    amount: 50,
    label: "Be a Hero",
    description: "Half of what's needed with £50",
  },
  {
    id: "opt5",
    amount: 100,
    label: "Transform a Family",
    description: "Give £100 and change lives",
  },
  {
    id: "opt6",
    amount: 0,
    label: "Custom Amount",
    description: "Donate what you can",
  },
]

export const donationService = {
  // Get all preset donation options
  async getDonationOptions(): Promise<DonationOption[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(donationOptions)
      }, 300)
    })
  },

  // Process donation
  async processDonation(donationData: Omit<Donation, "id" | "createdAt" | "status">): Promise<Donation> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDonation: Donation = {
          ...donationData,
          id: `d${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
          status: "completed", // Simulate successful payment
        }
        mockDonations.push(newDonation)

        // Update campaign amount if applicable
        if (donationData.campaignId) {
          const campaign = mockCampaigns.find((c) => c.id === donationData.campaignId)
          if (campaign) {
            campaign.currentAmount += donationData.amount
            campaign.percentageComplete = (campaign.currentAmount / campaign.targetAmount) * 100
            if (campaign.percentageComplete >= 100) {
              campaign.status = "completed"
            }
          }
        }

        resolve(newDonation)
      }, 1200)
    })
  },

  // Get all donations (admin)
  async getDonations(): Promise<Donation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDonations)
      }, 500)
    })
  },

  // Get donation by ID
  async getDonationById(id: string): Promise<Donation | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const donation = mockDonations.find((d) => d.id === id)
        resolve(donation || null)
      }, 300)
    })
  },

  // Get all campaigns
  async getCampaigns(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns)
      }, 500)
    })
  },

  // Get active campaigns only
  async getActiveCampaigns(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const active = mockCampaigns.filter((c) => c.status === "active")
        resolve(active)
      }, 500)
    })
  },

  // Get campaign by ID
  async getCampaignById(id: string): Promise<Campaign | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campaign = mockCampaigns.find((c) => c.id === id)
        resolve(campaign || null)
      }, 300)
    })
  },

  // Get donations for specific campaign
  async getCampaignDonations(campaignId: string): Promise<Donation[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campaignDonations = mockDonations.filter((d) => d.campaignId === campaignId)
        resolve(campaignDonations)
      }, 400)
    })
  },

  // Get donation statistics
  async getDonationStats(): Promise<{
    totalDonations: number
    totalAmount: number
    averageDonation: number
    donorCount: number
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalDonations = mockDonations.length
        const totalAmount = mockDonations.reduce((sum, d) => sum + d.amount, 0)
        const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0
        const uniqueDonors = new Set(mockDonations.map((d) => d.donorEmail)).size

        resolve({
          totalDonations,
          totalAmount,
          averageDonation,
          donorCount: uniqueDonors,
        })
      }, 400)
    })
  },
}

// Service to simulate member/user API calls

export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType: "individual" | "group"
  groupId?: string
  joinDate: string
  status: "active" | "inactive" | "pending"
  dependents?: number
  contribution: number
}

export interface Team {
  id: string
  firstName: string
  lastName: string
  role: string
  department: "leadership" | "technical" | "marketing" | "general"
  image?: string
  bio: string
  email?: string
}

// Mock team members
const mockTeam: Team[] = [
  {
    id: "1",
    firstName: "Samuel",
    lastName: "Nkongho",
    role: "Founder & Chairman",
    department: "leadership",
    image: "/placeholder-user.jpg",
    bio: "Samuel founded CAS-UK with a vision to support the Cameroonian community in the UK. With over 10 years of community service experience, he leads with integrity and passion.",
    email: "samuel@cas-uk.org",
  },
  {
    id: "2",
    firstName: "Amina",
    lastName: "Sanda",
    role: "Vice Chairman",
    department: "leadership",
    image: "/placeholder-user.jpg",
    bio: "Amina brings strategic vision and operational excellence to CAS-UK. Her dedication to transparency and community impact drives our organization forward.",
    email: "amina@cas-uk.org",
  },
  {
    id: "3",
    firstName: "David",
    lastName: "Fon",
    role: "Technical Lead",
    department: "technical",
    image: "/placeholder-user.jpg",
    bio: "David oversees all technical infrastructure and systems. His expertise ensures CAS-UK operates smoothly and securely.",
    email: "david@cas-uk.org",
  },
  {
    id: "4",
    firstName: "Grace",
    lastName: "Tango",
    role: "Marketing Manager",
    department: "marketing",
    image: "/placeholder-user.jpg",
    bio: "Grace connects CAS-UK with the broader community through strategic communication and outreach initiatives.",
    email: "grace@cas-uk.org",
  },
  {
    id: "5",
    firstName: "James",
    lastName: "Djoume",
    role: "Treasurer",
    department: "leadership",
    image: "/placeholder-user.jpg",
    bio: "James ensures all financial operations are transparent, compliant, and aligned with our mission.",
    email: "james@cas-uk.org",
  },
  {
    id: "6",
    firstName: "Fatima",
    lastName: "Hassan",
    role: "Community Coordinator",
    department: "general",
    image: "/placeholder-user.jpg",
    bio: "Fatima connects groups, organizes events, and ensures every member feels valued and supported.",
    email: "fatima@cas-uk.org",
  },
]

// Mock members
const mockMembers: Member[] = [
  {
    id: "m1",
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed@example.com",
    phone: "+44-123-456-7890",
    membershipType: "individual",
    joinDate: "2023-01-15",
    status: "active",
    dependents: 2,
    contribution: 25,
  },
  {
    id: "m2",
    firstName: "Fatima",
    lastName: "Nkomo",
    email: "fatima@example.com",
    phone: "+44-123-456-7891",
    membershipType: "group",
    groupId: "g1",
    joinDate: "2022-06-20",
    status: "active",
    dependents: 3,
    contribution: 15,
  },
]

// Mock groups
export interface CommunityGroup {
  id: string
  name: string
  location: string
  admin: string
  adminEmail: string
  memberCount: number
  foundedDate: string
  description: string
}

const mockGroups: CommunityGroup[] = [
  {
    id: "g1",
    name: "London Metropolitan Group",
    location: "London, UK",
    admin: "Samuel Nkongho",
    adminEmail: "samuel@cas-uk.org",
    memberCount: 45,
    foundedDate: "2017-05-10",
    description: "The original and largest CAS-UK group based in London, serving the metropolitan area.",
  },
  {
    id: "g2",
    name: "Manchester Regional Group",
    location: "Manchester, UK",
    admin: "David Fon",
    adminEmail: "david.fon@example.com",
    memberCount: 28,
    foundedDate: "2018-03-22",
    description: "Serving the Cameroonian community across Manchester and surrounding areas.",
  },
  {
    id: "g3",
    name: "Birmingham Community Group",
    location: "Birmingham, UK",
    admin: "Amina Sanda",
    adminEmail: "amina.sanda@example.com",
    memberCount: 32,
    foundedDate: "2019-07-15",
    description: "Building strong ties among Cameroonians in the Birmingham region.",
  },
  {
    id: "g4",
    name: "Edinburgh Scottish Group",
    location: "Edinburgh, Scotland",
    admin: "Grace Tango",
    adminEmail: "grace.tango@example.com",
    memberCount: 18,
    foundedDate: "2020-11-05",
    description: "Representing Cameroonians in Scotland with cultural events and community support.",
  },
]

export const memberService = {
  // Get all team members
  async getTeamMembers(department?: string): Promise<Team[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = department ? mockTeam.filter((t) => t.department === department) : mockTeam
        resolve(filtered)
      }, 500)
    })
  },

  // Get team member by ID
  async getTeamMemberById(id: string): Promise<Team | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const member = mockTeam.find((t) => t.id === id)
        resolve(member || null)
      }, 300)
    })
  },

  // Get all members
  async getMembers(): Promise<Member[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMembers)
      }, 500)
    })
  },

  // Get member by ID
  async getMemberById(id: string): Promise<Member | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const member = mockMembers.find((m) => m.id === id)
        resolve(member || null)
      }, 300)
    })
  },

  // Register new member (simulate)
  async registerMember(memberData: Omit<Member, "id" | "joinDate" | "status">): Promise<Member> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMember: Member = {
          ...memberData,
          id: `m${Date.now()}`,
          joinDate: new Date().toISOString().split("T")[0],
          status: "pending",
        }
        mockMembers.push(newMember)
        resolve(newMember)
      }, 800)
    })
  },

  // Get all groups
  async getGroups(): Promise<CommunityGroup[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGroups)
      }, 500)
    })
  },

  // Get group by ID
  async getGroupById(id: string): Promise<CommunityGroup | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const group = mockGroups.find((g) => g.id === id)
        resolve(group || null)
      }, 300)
    })
  },

  // Register new group
  async registerGroup(
    groupData: Omit<CommunityGroup, "id" | "foundedDate" | "memberCount">
  ): Promise<CommunityGroup> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGroup: CommunityGroup = {
          ...groupData,
          id: `g${Date.now()}`,
          foundedDate: new Date().toISOString().split("T")[0],
          memberCount: 1,
        }
        mockGroups.push(newGroup)
        resolve(newGroup)
      }, 800)
    })
  },
}

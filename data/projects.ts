export type Project = {
    slug: string;
    title: string;
    category: string;
    metric: string;
    metricLabel: string;
    description: string;
    type: 'laptop' | 'mobile';
    color: string;
    gradient: string;
    challenge: string;
    solution: string;
    result: string;
    stats: { label: string; value: string }[];
    techStack: string[];
    mockups: string[];
    filter: 'Churches' | 'Businesses' | 'SaaS Products';
};

export const projects: Project[] = [
    {
        slug: "mindlink",
        title: "MindLink",
        category: "AI SaaS Platform",
        metric: "+40%",
        metricLabel: "Efficiency Increase",
        description: "AI-driven metadata extraction tool for enterprise document management.",
        type: "laptop",
        color: "text-neon-lime",
        gradient: "from-neon-lime/20 to-transparent",
        challenge: "Enterprise document management was plagued by manual innovative tagging, leading to thousands of wasted hours and lost data. The client needed a solution that could autonomously understand and categorize vast archives.",
        solution: "We engineered a proprietary NLP engine capable of context-aware metadata extraction. By integrating this with a custom vector database, we created a system that doesn't just store documents, but understands them.",
        result: "MindLink now processes over 50,000 documents daily with 99.8% accuracy, reducing manual retrieval time by 40% and unlocking previously inaccessible data insights.",
        stats: [
            { label: "Processing Speed", value: "0.4s/doc" },
            { label: "Accuracy", value: "99.8%" },
            { label: "User Adoption", value: "12k+" }
        ],
        techStack: ["Next.js", "Python", "TensorFlow", "Pinecone", "PostgreSQL"],
        mockups: ["/mockups/mindlink-1.jpg", "/mockups/mindlink-2.jpg"],
        filter: "SaaS Products"
    },
    {
        slug: "gym-website",
        title: "Gym Website",
        category: "High-Performance Web",
        metric: "<1s",
        metricLabel: "Load Speed",
        description: "Ultra-fast Next.js website optimized for conversion and SEO.",
        type: "laptop",
        color: "text-electric-azure",
        gradient: "from-electric-azure/20 to-transparent",
        challenge: "The client's previous site had a 40% bounce rate due to slow loading times and a confusing user journey. They needed a digital presence that matched the high-energy intensity of their physical location.",
        solution: "We rebuilt the core architecture using Next.js 14 and React Server Components to eliminate hydration bloat. A headless CMS approach allowed for rapid content updates without compromising performance.",
        result: "The new site loads in under 1 second globally. Conversion rates for membership sign-ups doubled within the first month, directly attributed to the frictionless user experience.",
        stats: [
            { label: "LCP", value: "0.8s" },
            { label: "SEO Score", value: "100" },
            { label: "Conversion", value: "+110%" }
        ],
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
        mockups: ["/mockups/gym-1.jpg", "/mockups/gym-2.jpg"],
        filter: "Businesses"
    },
    {
        slug: "sneakers-store",
        title: "Sneakers Store",
        category: "E-Commerce",
        metric: "$20k",
        metricLabel: "Monthly Revenue",
        description: "Custom Shopify layout with 3D product visualization.",
        type: "laptop", // Keeping as laptop for consistency with Portfolio.tsx logic
        color: "text-purple-400",
        gradient: "from-purple-400/20 to-transparent",
        challenge: "In a saturated streetwear market, standard grid-based e-commerce stores fail to capture the 'hype' factor. The brand needed an immersive shopping experience that felt like a digital showroom (and to look cool).",
        solution: "We implemented WebGL-based 3D model viewers allowing users to rotate and inspect sneakers. Coupled with a custom Shopify headless frontend, we merged storytelling with seamless checkout.",
        result: "Engagement time increased by 300%. The 3D viewer alone accounted for a 25% reduction in returns, as customers had a much better understanding of the product before purchase.",
        stats: [
            { label: "Return Rate", value: "-25%" },
            { label: "Avg Session", value: "4m 12s" },
            { label: "Sales Increase", value: "3x" }
        ],
        techStack: ["Shopify Hydrogen", "Three.js", "React Three Fiber", "GSAP"],
        mockups: ["/mockups/sneakers-1.jpg", "/mockups/sneakers-2.jpg"],
        filter: "Businesses"
    }
];

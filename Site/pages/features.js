import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Features = () => {
    const featureList = [
        {
            title: "Clean User Interface",
            description: "Elegant, minimalistic design with black and white color scheme for a professional look that puts your content front and center.",
            icon: "📱"
        },
        {
            title: "Fully Responsive",
            description: "Your LinkFolio adapts perfectly to all screen sizes - looking great on everything from smartphones to large desktop monitors.",
            icon: "✨"
        },
        {
            title: "Easy Link Management",
            description: "Add, edit, and delete links with just a few clicks through an intuitive dashboard. Group links by categories for better organization.",
            icon: "🔗"
        },
        {
            title: "Social Media Integration",
            description: "Connect all your social profiles with stylish icons in one central hub, making it easy for your audience to follow you everywhere.",
            icon: "📣"
        },
        {
            title: "Custom Profiles",
            description: "Upload your photo, add a bio, and customize your profile to match your brand identity and make a lasting impression.",
            icon: "🎨"
        },
        {
            title: "Analytics Ready",
            description: "Track visitor counts, link clicks, and engagement patterns to understand your audience better and optimize your content strategy.",
            icon: "📊"
        },
        {
            title: "SEO Optimized",
            description: "Built with search engines in mind, including proper meta tags, structured data, and performance optimization for better visibility.",
            icon: "🔍"
        },
        {
            title: "Fast Performance",
            description: "Lightning-fast page loads and smooth interactions thanks to Next.js, optimized code structure, and efficient database queries.",
            icon: "⚡"
        }
    ];

    return (
        <>
            <Head>
                <title>LinkFolio Features - All You Need to Know</title>
                <meta name="description" content="Explore the powerful features of LinkFolio, the ultimate platform for creating your personalized link hub and professional online presence." />
            </Head>
            <div className='min-h-screen bg-gray-50 pt-20 pb-12 px-4'>
                <div className='max-w-5xl mx-auto'>
                    <div className='text-center mb-16 pt-10'>
                        <h1 className='text-4xl font-bold font-heading mb-4 text-gray-900'>Features</h1>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Everything you need to create a professional online presence in one place</p>
                        <div className="h-1 w-20 bg-black mx-auto mt-6"></div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {featureList.map((feature, index) => (
                            <div key={index} className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                                <div className='text-3xl mb-4'>{feature.icon}</div>
                                <h3 className='text-xl font-bold mb-2 font-heading text-gray-900'>{feature.title}</h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className='mt-16 bg-white p-8 rounded-xl shadow-sm'>
                        <h2 className='text-2xl font-bold mb-6 text-gray-900 font-heading text-center'>How LinkFolio Works</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                            <div className='flex flex-col items-center'>
                                <div className='w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-4'>1</div>
                                <h3 className='text-lg font-bold mb-2'>Create Account</h3>
                                <p className='text-gray-600'>Sign up in seconds and claim your unique LinkFolio handle</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-4'>2</div>
                                <h3 className='text-lg font-bold mb-2'>Add Your Links</h3>
                                <p className='text-gray-600'>Customize your profile and add all your important links</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-4'>3</div>
                                <h3 className='text-lg font-bold mb-2'>Share With World</h3>
                                <p className='text-gray-600'>Share your LinkFolio URL on social media and in your bio</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mt-16 text-center'>
                        <h2 className='text-2xl font-bold mb-6 text-gray-900 font-heading'>Technical Stack</h2>
                        <div className='inline-flex flex-wrap justify-center gap-4 bg-white p-6 rounded-xl shadow-sm'>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>Next.js</span>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>MongoDB</span>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>Express</span>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>Node.js</span>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>TailwindCSS</span>
                            <span className='px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800'>JWT Authentication</span>
                        </div>
                    </div>
                    
                    <div className='mt-16 text-center'>
                        <h2 className='text-2xl font-bold mb-4 text-gray-900 font-heading'>Ready to get started?</h2>
                        <p className='mb-6 text-gray-600'>Create your LinkFolio profile in minutes and share it with the world</p>
                        <Link href="/apply" className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features
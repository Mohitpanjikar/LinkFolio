import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkFolio - One Link to Rule Them All</title>
        <meta name="description" content="Create your professional link portfolio with LinkFolio. Share all your content, social media profiles, and important links in one beautiful page." />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight mb-6">
                  One Link for All <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">Your Content</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl">
                  Create your professional link portfolio with LinkFolio. Share your content, social media, and important links in one beautiful page.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/apply" className="inline-block px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    Get Started Free
                  </Link>
                  <Link href="/features" className="inline-block px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-5/12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
                  <div className="relative h-96 w-full rounded-lg overflow-hidden border border-gray-200">
                    <div className="absolute inset-0 flex flex-col bg-gray-100">
                      <div className="h-20 bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-xl">@linkfolio</span>
                      </div>
                      <div className="flex-1 p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 -mt-12 border-4 border-white"></div>
                        <h3 className="font-bold text-lg">Your Name</h3>
                        <p className="text-gray-500 text-sm mb-6">Your bio goes here</p>
                        
                        <div className="w-full space-y-3">
                          <div className="w-full h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center">
                            <span className="text-sm font-medium">Website</span>
                          </div>
                          <div className="w-full h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center">
                            <span className="text-sm font-medium">Portfolio</span>
                          </div>
                          <div className="w-full h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center">
                            <span className="text-sm font-medium">Instagram</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4">Why Choose LinkFolio?</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Designed for creators, professionals and brands looking to build their online presence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-xl font-bold mb-2">All-in-One Solution</h3>
                <p className="text-gray-600">Combine all your links, social media, and content in a single, customizable page.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Built with Next.js and optimized for maximum performance and minimal load times.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Professional Design</h3>
                <p className="text-gray-600">Clean, modern interface that perfectly represents your personal brand.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/features" className="inline-block px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                View All Features →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Ready to Build Your LinkFolio?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">Join thousands of creators, brands, and professionals sharing their content with the world.</p>
            <Link href="/apply" className="inline-block px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

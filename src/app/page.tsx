import Link from 'next/link';
import { ExternalLink } from "lucide-react";
import Image from 'next/image';

const projects = [
  {
    title: "HarmonyHelper",
    description: "AI-powered tool aimed to empower mental health support care workers. 1st place winner for ShiftKeyLabs Hackathon 🏆",
    tech: [],
    link: "https://devpost.com/software/harmonyhelper",
    image: "/shiftkeyLabs.png"
  },
  {
    title: "Nimbus Cloud",
    description: "Scalable AWS solution integrating Spotify's API to generate personalized daily song recommendations.",
    tech: [],
    link: "https://github.com/Liam-So/nimbus-cloud",
    image: "/spotify.png"
  },
  {
    title: "Dr Screen",
    description: "Supplementary tool to streamline family practitioners jobs by implementing a ML model that generates confidence probabilities of diseases with the inputted symptoms",
    tech: [],
    link: "https://devpost.com/software/dr-screen",
    image: "/dr_screen.png"
  },
  {
    title: "4AM Basketball",
    description: "E-commerce application for local non-profit organization. Reduced biggest expense for organization by 96.25%.",
    tech: [],
    link: "https://4ambasketball.com/",
    image: "/4am.png"
  },
];

export default function Home() {
  return (
    <div className='min-h-screen bg-[#FDF7F2] p-8'>
      <div className="max-w-screen-2xl mx-auto">
      <section className="flex justify-between items-center">
          <div>
            <Link href="/" className='text-decoration-line: underline'>Liam So</Link>
            
          </div>
          <div className='flex gap-6'>
            <Link href="/blog" className="cursor-pointer hover:text-gray-600">Blog</Link>
            <a href="https://github.com/Liam-So" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-gray-600">Github</a>
          </div>
      </section>

      <section className='pt-3'>
        <p>Software Engineer at ResMed</p>
      </section>

        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-b-2">
          {/* GIF 1 */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
          <a href="https://fintrack-rho.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/categories-new.gif"
              alt="Categories demonstration"
              fill
              className="object-cover"
              unoptimized
            />
          </a>
          </div>

          {/* GIF 2 */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
          <a href="https://fintrack-rho.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/dashboard-new.gif"
              alt="Dashboard demonstration"
              fill
              className="object-cover"
              unoptimized
            />
          </a>
          </div>

          {/* GIF 3 */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <a href="https://fintrack-rho.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/upload-new.gif"
                alt="Upload demonstration"
                fill
                className="object-cover"
                unoptimized
              />
            </a>
          </div>

          <div className='py-8'>
            <p className='text-decoration-line: underline'>FinTrack, 2025</p>  
            <p>Smart Expense Tracker Powered by AI</p>
            <div className='flex gap-2'>
            <a className='text-blue-600 hover:text-blue-800 text-sm' href={"https://fintrack-rho.vercel.app/"} target="_blank"
                    rel="noopener noreferrer">View Demo</a>
              <Link className='text-blue-600 hover:text-blue-800 text-sm' href={"/fintrack"}>View Blog</Link>
              <a className='text-blue-600 hover:text-blue-800 text-sm' href={"https://github.com/Liam-So/fintrack"} target="_blank"
                    rel="noopener noreferrer">View Code</a>
            </div>
          </div>
        </div>


        {/* add different less impressive projects here */}
        <div className="mt-16">
          <h2 className="mb-8">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="space-y-3">
                {/* <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div> */}
                <div className="space-y-1.5">
                  <h3 className="text-decoration-line: underline">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import {ExternalLink, Sparkles, Zap} from 'lucide-react';

import {
  GlassMorphicCard,
  ProjectButton,
  SocialLink,
  MagicalElements,
  MagicalCookingAnimation
} from '~/components';

import GMailSVG from "../assets/icons/gmail.svg?react";
import TwitterSVG from "../assets/icons/twitter.svg?react";
import WhatsappSVG from "../assets/icons/whatsapp.svg?react";

// Meta function for SEO
export const meta: MetaFunction = () => {
  return [
    { title: "Something's Cooking - Portfolio Under Construction" },
    { name: "description", content: "Portfolio site under development. Check out my live projects and get in touch!" },
    { name: "keywords", content: "portfolio, developer, under construction, projects" },
    { property: "og:title", content: "Something's Cooking - Portfolio Under Construction" },
    { property: "og:description", content: "Brewing up something magical in the digital realm. Stay tuned for the enchantment!" },
    { property: "og:type", content: "website" },
  ];
};


// Main Route Component
export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background magical elements */}
      <MagicalElements />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-pulse">
            Something's Cooking
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Brewing up something magical in the digital realm. Stay tuned for the results!
          </p>
        </div>

        {/* Magical cooking animation in glassmorphic card */}
        <GlassMorphicCard className="p-12 mb-16 hover:bg-white/15 transition-all duration-500">
          <MagicalCookingAnimation />
        </GlassMorphicCard>

        {/* Portfolio statement and projects */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Portfolio site still under design and development but you can check out my live projects here
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <ProjectButton href="https://movie-explorer-pro.vercel.app/">
              FilmExplorerPro
            </ProjectButton>
            <ProjectButton href="#">
              ClosetAI
            </ProjectButton>
            <ProjectButton href="https://lynqup.netlify.app/">
              LynqUp
            </ProjectButton>
            <ProjectButton href="https://github.com/RashnerdUX/shared_activity_planner">
              Shared Planner API
            </ProjectButton>
            <ProjectButton href="https://cover-letter-assistant-643395387467.europe-west2.run.app/">
              Cover Letter Assistant 
            </ProjectButton>
            <ProjectButton href="https://myworld.kelvinakhigbe.com">
              Rashnerd's World 
            </ProjectButton>
          </div>
        </div>

        {/* Contact section */}
        <GlassMorphicCard className="p-8 w-full max-w-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            You can also reach out to me on the following channels
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SocialLink
              href="https://twitter.com/rash_nerd"
              icon={TwitterSVG}
              label="Twitter"
              color="black"
            />
            <SocialLink
              href="mailto:akhigbek6@gmail.com"
              icon={GMailSVG}
              label="Email"
              color="red"
            />
            <SocialLink
              href="https://wa.me/+2349036720188"
              icon={WhatsappSVG}
              label="WhatsApp"
              color="green"
            />
          </div>
        </GlassMorphicCard>
      </div>
    </div>
  );
}
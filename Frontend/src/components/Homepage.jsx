// src/components/Homepage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Zap, 
  ArrowRight, 
  Instagram, 
  Star,
  ChevronDown,
  Play,
  Shield
} from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div className="relative bg-gray-800/40 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300" />
        
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Homepage = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Logo and Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center items-center gap-4 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Vibe Check AI
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-4 font-light"
            >
              Main character or background NPC?
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Discover your digital personality through AI-powered analysis of your Instagram profile. 
              Get personalized insights, custom memes, and find out what vibe you're really giving off.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-3 text-lg"
              >
                <Play className="w-5 h-5" />
                Start Your Vibe Check
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                onClick={scrollToFeatures}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800/60 backdrop-blur-lg hover:bg-gray-700/60 text-white font-semibold py-4 px-8 rounded-2xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 flex items-center gap-3 text-lg"
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats/Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center items-center gap-8 text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                <span>Instagram Analysis</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span>AI Powered</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI analyzes your digital footprint to create a comprehensive vibe profile
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Instagram}
              title="Instagram Analysis"
              description="Deep dive into your posts, captions, and visual content to understand your digital personality and aesthetic preferences."
              delay={0.1}
            />
            
            <FeatureCard
              icon={Brain}
              title="AI-Powered Insights"
              description="Advanced sentiment analysis and personality detection using cutting-edge AI technology to decode your true vibe."
              delay={0.2}
            />
            
            <FeatureCard
              icon={Heart}
              title="Personalized Results"
              description="Get a detailed breakdown of your personality traits, mood patterns, and what others really think about your content."
              delay={0.3}
            />
            
            <FeatureCard
              icon={Sparkles}
              title="Custom Memes"
              description="Receive personalized memes generated based on your analysis results. Perfect for sharing or just having a laugh."
              delay={0.4}
            />
            
            <FeatureCard
              icon={Zap}
              title="Instant Results"
              description="Get your complete vibe analysis in seconds. No waiting around - instant gratification for your curiosity."
              delay={0.5}
            />
            
            <FeatureCard
              icon={Shield}
              title="Privacy Focused"
              description="Your data stays secure and private. We analyze content without storing personal information or compromising your privacy."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gray-800/40 backdrop-blur-lg p-12 rounded-3xl border border-gray-700/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl" />
            
            <div className="relative z-10">
              <Star className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Discover Your Digital Vibe?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who've already uncovered their true digital personality. 
                It's free, it's fun, and it's surprisingly accurate.
              </p>
              
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 text-lg"
              >
                Get Your Vibe Check Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Homepage;
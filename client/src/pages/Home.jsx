import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle, ListTodo, Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  const { user,token} = useSelector((state) => state.auth);
 const storedToken = localStorage.getItem("token");
  const redirectPath =
  (user && token) || storedToken ? "/dashboard" : "/register";
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a15] via-[#0f0f1a] to-[#1a0a1f] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
          
          {/* Icon Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 blur-xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-purple-600 to-pink-500 p-3 sm:p-4 rounded-2xl">
                <ListTodo className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3"
          >
            <span className="text-white">Full Stack </span>
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              TODO
            </span>
            <span className="text-white"> App</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 text-xs sm:text-sm mb-2"
          >
            Manage your tasks efficiently and stay organized
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 text-xs mb-6"
          >
            Sign up or log in to get started!
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
          >
            <FeatureCard 
              icon={<CheckCircle className="w-4 h-4" />}
              title="Track Tasks"
              delay={0.7}
            />
            <FeatureCard 
              icon={<Sparkles className="w-4 h-4" />}
              title="Stay Organized"
              delay={0.8}
            />
            <FeatureCard 
              icon={<ListTodo className="w-4 h-4" />}
              title="Boost Productivity"
              delay={0.9}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link to={redirectPath}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-linear-to-r from-purple-600 to-pink-500 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-4"
          >
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 transition-colors underline"
              >
                Log in
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <FloatingElement 
          className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
          delay={0}
        />
        <FloatingElement 
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
          delay={1}
        />
      </motion.div>
    </div>
  );
};

export default Home;

/* ANIMATED BACKGROUND */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-30">
      <defs>
        <linearGradient id="homeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="20%"
        cy="30%"
        r="150"
        fill="url(#homeGrad1)"
        initial={{ scale: 0.8, opacity: 0.2 }}
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.circle
        cx="80%"
        cy="70%"
        r="180"
        fill="url(#homeGrad1)"
        initial={{ scale: 1, opacity: 0.1 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </svg>
  </div>
);

/* FEATURE CARD */
const FeatureCard = ({ icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:border-purple-500/30 transition-all"
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center justify-center w-8 h-8 bg-purple-500/20 rounded-lg text-purple-400 mb-2"
    >
      {icon}
    </motion.div>
    <p className="text-xs text-gray-300">{title}</p>
  </motion.div>
);

/* FLOATING ELEMENT */
const FloatingElement = ({ className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={className}
  />
);
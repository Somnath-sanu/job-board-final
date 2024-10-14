"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-violet-800 via-indigo-800 to-blue-700"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`m-auto my-10 max-w-5xl space-y-8 rounded-xl p-10 text-center shadow-2xl ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold"
        >
          Job Submitted Successfully!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Your job posting has been submitted and is pending approval.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-block rounded-full bg-gradient-to-r from-indigo-700 to-blue-500 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              AI Career Planner
            </h3>
            <p className="text-gray-400 max-w-md">
              Empowering professionals to build successful careers in artificial
              intelligence through personalized guidance and expert insights.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Career Roadmaps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Job Matching
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Skill Assessment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Industry Insights
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 AI Career Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

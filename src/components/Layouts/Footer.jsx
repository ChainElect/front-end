import React from 'react';
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'; // Import icons
const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Social Media Icons */}
        <div className="flex flex-col space-y-4">
          <img alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4 text-white">
            <FaTwitter className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
            <FaYoutube className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
            <FaLinkedin className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Link Columns */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Use cases</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">UI design</a></li>
              <li><a href="#" className="hover:text-white">UX design</a></li>
              <li><a href="#" className="hover:text-white">Wireframing</a></li>
              <li><a href="#" className="hover:text-white">Diagramming</a></li>
              <li><a href="#" className="hover:text-white">Brainstorming</a></li>
              <li><a href="#" className="hover:text-white">Online whiteboard</a></li>
              <li><a href="#" className="hover:text-white">Team collaboration</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Design</a></li>
              <li><a href="#" className="hover:text-white">Prototyping</a></li>
              <li><a href="#" className="hover:text-white">Development features</a></li>
              <li><a href="#" className="hover:text-white">Design systems</a></li>
              <li><a href="#" className="hover:text-white">Collaboration features</a></li>
              <li><a href="#" className="hover:text-white">Design process</a></li>
              <li><a href="#" className="hover:text-white">FigJam</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Best practices</a></li>
              <li><a href="#" className="hover:text-white">Colors</a></li>
              <li><a href="#" className="hover:text-white">Color wheel</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">Developers</a></li>
              <li><a href="#" className="hover:text-white">Resource library</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

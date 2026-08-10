import { ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-800 pb-8">
        <h1 className="text-4xl font-bold mb-4">About CineScope</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          CineScope is a production-quality TV show discovery app built to help you find your next favorite show.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-light">The Project</h2>
        <p className="text-gray-300 leading-relaxed">
          This application was developed as a Web Development Internship assessment for CodingAtom. 
          It focuses on performance, accessibility, responsive design, and robust error handling.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-light">Tech Stack</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-primary">
          <li><strong>Frontend:</strong> React + Vite</li>
          <li><strong>Routing:</strong> React Router</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>Icons:</strong> Lucide React</li>
          <li><strong>Data:</strong> TVMaze API</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-light">Key Features</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-primary">
          <li>Debounced search with abort-controller for network efficiency.</li>
          <li>Comprehensive error handling and empty states.</li>
          <li>Favorites persistence using localStorage.</li>
          <li>Fully responsive layout without horizontal scrolling.</li>
          <li>Accessible semantic HTML and focus management.</li>
        </ul>
      </section>

      <section className="bg-dark-paper border border-gray-800 p-6 rounded-xl mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Credits & Data
        </h2>
        <p className="text-gray-400 mb-4">
          All television show data, including images and episode summaries, is provided by the amazing TVMaze API.
        </p>
        <div className="flex gap-4">
          <a 
            href="https://www.tvmaze.com/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
          >
            <ExternalLink size={18} />
            TVMaze API Documentation
          </a>
        </div>
      </section>
    </div>
  );
}

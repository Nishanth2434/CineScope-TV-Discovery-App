export default function Footer() {
  return (
    <footer className="bg-dark-paper border-t border-gray-800 p-6 text-center text-gray-400 mt-auto">
      <p>&copy; {new Date().getFullYear()} CineScope. Data provided by <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TVMaze</a>.</p>
    </footer>
  );
}

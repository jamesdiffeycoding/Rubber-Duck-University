import { useTheme } from "../ThemeContext";

// Define the types for CircleImageAndText props
interface CircleImageAndTextProps {
  imageSrc: string;
  altText: string;
  description: string;
  isDarkMode: boolean;
}

// CircleImageAndText component
const CircleImageAndText = ({
  imageSrc,
  altText,
  description,
  isDarkMode,
}: CircleImageAndTextProps) => (
  <div className="flex flex-col items-center text-center">
    <div
      className="mx-auto mb-4 rounded-full"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.4)"
          : "rgba(0, 255, 0, 0.2)",
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-24 h-24 object-contain rounded-full border-4 border-solid"
        style={{ borderColor: isDarkMode ? "#ffffff" : "#1F2937" }}
      />
    </div>
    <p>{description}</p>
  </div>
);

export default function Rankings() {
  const { isDarkMode } = useTheme();
  return (
    <section
      className={`w-full flex justify-center text-white rounded-xl ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-sky-500 via-sky-700 to-sky-500"
      }`}
    >
      <div className="p-4 max-w-[1200px]">
        <h2 className="text-2xl font-bold text-center mb-4">
          Progress through the Duck University ranks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-8">
          <CircleImageAndText
            imageSrc="/ducks (3).jpg"
            altText="Teaching Assistant"
            description="Teaching Assistant (1+ ducks helped)"
            isDarkMode={isDarkMode}
          />
          <CircleImageAndText
            imageSrc="/ducks (5).jpg"
            altText="Seminar Leader"
            description="Seminar Leader (20+ ducks helped)"
            isDarkMode={isDarkMode}
          />
          <CircleImageAndText
            imageSrc="/ducks (6).jpg"
            altText="Lecturer"
            description="Lecturer (100+ ducks helped)"
            isDarkMode={isDarkMode}
          />
          <CircleImageAndText
            imageSrc="/ducks (1).jpg"
            altText="Assistant Professor"
            description="Assistant Professor (300+ ducks helped)"
            isDarkMode={isDarkMode}
          />
          <CircleImageAndText
            imageSrc="/duckwithnotebook.jpg"
            altText="Tenured Professor"
            description="Tenured Professor (700+ ducks helped)"
            isDarkMode={isDarkMode}
          />
          <CircleImageAndText
            imageSrc="/duckprofessor.jpg"
            altText="Provost"
            description="Provost (1000+ ducks helped)"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </section>
  );
}

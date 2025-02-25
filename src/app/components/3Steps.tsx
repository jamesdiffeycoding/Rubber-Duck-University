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

export default function ThreeSteps() {
  const { isDarkMode } = useTheme();
  return (
    <section
      className={`w-full flex justify-center text-white rounded-xl ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-sky-500 via-sky-700 to-sky-400"
      }`}
    >
      <section
        className={`flex justify-center  
            }`}
      >
        <div className="p-4 max-w-[900px]">
          <h2 className="text-2xl font-bold mb-4 text-center">
            A simple 3-step process for faster learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <CircleImageAndText
              imageSrc="/sign.png"
              altText="Step 1: Choose a topic"
              description="Choose a topic to talk about."
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/rubberducky.png"
              altText="Step 2: Teach a duck"
              description="Teach a duck all you know about that topic in 5 minutes."
              isDarkMode={isDarkMode}
            />
            <CircleImageAndText
              imageSrc="/duckgroupsigns.png"
              altText="Step 3: Grade your response"
              description="View and grade your previous responses."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

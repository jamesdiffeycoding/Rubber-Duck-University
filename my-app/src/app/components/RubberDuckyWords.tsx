interface RubberDuckyText {
  heading: string;
  paragraph: string;
}

export default function RubberDuckyWords({
  heading,
  paragraph,
}: RubberDuckyText) {
  return (
    <>
      <div className="max-w-3xl ml-4 mb-8 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{heading}</h2>
        <p className="text-lg text-gray-600">{paragraph}</p>
      </div>
    </>
  );
}

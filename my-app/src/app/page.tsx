"use client";
import RubberDucky from "./components/RubberDucky";
import RubberDuckyWords from "./components/RubberDuckyWords";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [stage, setStage] = useState(0);
  return (
    <>
      <main className="bg-gray-100 p-8">
        <section className="flex">
          <RubberDucky />
          <RubberDuckyWords
            heading="Want to be a better dev?"
            paragraph="Answer my questions without external support to truly deepen your learning."
          />
        </section>

        <hr></hr>

        <section className="mb-12">
          <p className="text-lg text-gray-600">
            Rubber Duck Learning forces you to engage in active recall and
            verbalization - building your neural connections for faster
            knowledge retrieval and helping you identify your knowledge gaps so
            that you can become the developer you always wanted to be.
          </p>
        </section>

        <hr></hr>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600">
            Rubber Duck Learning forces you to engage in active recall and
            verbalization - building your neural connections for faster
            knowledge retrieval and helping you identify your knowledge gaps so
            that you can become the developer you always wanted to be.
          </p>
        </section>
        <hr></hr>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            3-step process
          </h2>
          <ul className="list-inside list-disc text-lg text-gray-600 space-y-2">
            <li>Choose a question or prompt that is meaningful to you.</li>
            <li>Write your best answer to it without external help.</li>
            <li>
              Record a short comment about what you did well and what you could
              improve on.
            </li>
          </ul>
        </section>
        <hr></hr>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why I built Rubber Duck Learning
          </h2>
          <p className="text-lg text-gray-600">
            Developers often fail to build a deep understanding of the
            technologies they use. We build fast and we speedily complete
            courses; we enjoy the ride, but sometimes neglect taking the time to
            check (and reinforce) what we’ve really learned along the way.
          </p>
        </section>
        <Link href="/talk">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all">
            Get started
          </button>
        </Link>
      </main>
    </>
  );
}

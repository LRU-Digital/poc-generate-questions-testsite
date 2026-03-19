import Image from 'next/image';
import { getChapter2Content } from '@/lib/getPdfContent';
import GenerateQuestionsButton from '@/components/GenerateQuestionsButton';


export default async function Chapter2Page() {
  const content = await getChapter2Content();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Chapter header */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          Kapitel 2 · Ca. 4 lektioner
        </p>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-4xl font-black text-gray-900">Om en skagensmaler</h2>
          <GenerateQuestionsButton />
            
        </div>
        <p className="text-gray-700 leading-relaxed">
          I dette kapitel skal du gå i dybden med en skagensmaler. Du kan vælge at fordybe dig
          mere i en af de kunstnere, du bliver præsenteret for. Du kan også vælge at lære om en
          helt ny kunstner.
        </p>
      </div>

      {/* Hero image */}
      <div className="mb-8 rounded overflow-hidden">
        <Image
          src="/skagensmalere.jpeg"
          alt="Skagensmalere – maleri"
          width={900}
          height={450}
          className="w-full object-cover"
          priority
        />
        <p className="text-xs text-gray-400 mt-1">
          © Michael Ancher, Redningsbåden køres gennem klitterne, 1883. Statens Museum for Kunst, www.smk.dk
        </p>
      </div>

      {/* Intro section */}
      <section className="mb-6">
        <h3 className="text-2xl font-black text-gray-900 mb-2">Naturen som motiv</h3>
        <p className="text-gray-700 leading-relaxed">{content.intro}</p>
      </section>

      {/* Painter sections */}
      {content.sections.map((section) => (
        <div key={section.title}>
          <section className="mb-6">
            <h3 className="text-2xl font-black text-gray-900 mb-2">{section.title}</h3>
            <p className="text-gray-700 leading-relaxed">{section.body}</p>
          </section>

          {/* marie-kroeyer.jpeg below the Andre skagensmalere section */}
          {section.title.startsWith('Andre skagensmalere') && (
            <div className="mb-6 rounded overflow-hidden">
              <Image
                src="/marie-kroeyer.jpeg"
                alt="Dobbeltportræt af Marie og P.S. Krøyer"
                width={900}
                height={500}
                className="w-full object-cover"
              />
              <p className="text-xs text-gray-400 mt-1">
                ©P.S. Krøyer og Marie Krøyer Alfvén, Dobbeltportræt af Marie og P.S. Krøyer, 1890. Skagens Museum.
              </p>
            </div>
          )}

          {/* kroeyer.jpeg after the P.S. Krøyer section */}
          {section.title.startsWith('P.S. Krøyer') && (
            <div className="mb-6 rounded overflow-hidden">
              <Image
                src="/kroeyer.jpeg"
                alt="P.S. Krøyer – Sankt Hansblus på Skagen strand"
                width={900}
                height={500}
                className="w-full object-cover"
              />
              <p className="text-xs text-gray-400 mt-1">
                ©Peder Severin Krøyer, Sankt Hansblus på Skagen strand, 1906. Skagens Museum.
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Focus words */}
      <div className="bg-[#f0f0f0] rounded p-4 mb-6">
        <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide mb-3">Fokusord</h4>
        <div className="flex flex-wrap gap-2">
          {content.focusWords.map((word) => (
            <span
              key={word}
              className="bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1 rounded"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Activities */}
      <h3 className="text-xl font-black text-gray-900 mb-4">Aktiviteter</h3>
      <div className="space-y-5 mb-8">
        {content.activities.map((activity, idx) => (
          <div key={activity.title} className="border border-gray-200 rounded overflow-hidden">
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: '#5f0000' }}
            >
              <span className="w-7 h-7 rounded-full bg-white text-[#5f0000] text-sm font-black flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <h4 className="font-semibold text-white text-sm">{activity.title}</h4>
            </div>
            <ol className="px-5 py-4 space-y-2 bg-white">
              {activity.steps.map((step, stepIdx) => (
                <li key={stepIdx} className="flex gap-3 text-gray-700 text-sm">
                  <span className="flex-shrink-0 font-semibold text-[#5f0000]">{stepIdx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        © Alinea 2025 – Skagensmalerne – Sarah Tingleff (red.)
      </p>
    </div>
  );
}

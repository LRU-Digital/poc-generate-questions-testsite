'use client';

interface PopupProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function Popup({ visible, setVisible }: PopupProps) {
  if (!visible) return null;

  return (
    <>
      {/* Dimmed background overlay */}
      <div className="fixed inset-0 bg-black/50 z-40"  onClick={() => setVisible(false)}/>
      {/* Popup content */}
      <div onClick={() => setVisible(false)} className="z-100 absolute p-6 rounded-2xl bg-teal-800 shadow-lg shadow-gray-950 w-150 text-white top-13 left-[-200px] text-left">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* Speech bubble triangle – border layer */}
      <div className="absolute -top-3.25 left-6 w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-3.25 border-b-gray-100" />
      {/* Speech bubble triangle – fill layer */}
      <div className="absolute -top-[12px] left-[340px] w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-[12px] border-b-teal-800" />
      <p className="mb-2">Du er nu inde på et test-forløb og vi håber, du vil bære over med, at alt ikke ser ud, som det plejer. Det du skal teste er vores idé til en ny AI-funktion til lærere.</p>
          <p className="mb-2">Forestil dig, at du er ved at planlægge undervisning med indholdet på siden her. Du kan ikke helt bruge indholdet, som det er.</p>
          <p className="mb-2">Klik på knappen ovenover for at bruge AI-funktionen og få andet indhold.</p>
          <p className="mb-2">Du kan teste den lige så længe, du har lyst. Tak for at være med!</p>
        <p>Her kan du teste vores kommende funktionalitet, hvor du med hjælp fra AI, kan generere en række spørgsmål til teksten på den nuværende side.</p>
      </div>
    </>
  );
}

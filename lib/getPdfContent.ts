import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export interface Chapter2Content {
  intro: string;
  focusWords: string[];
  sections: {
    title: string;
    body: string;
  }[];
  activities: {
    title: string;
    steps: string[];
  }[];
}

function extractChapter2(text: string): Chapter2Content {
  // Find Chapter 2 text boundaries
  const ch2Start = text.indexOf('Kapitel 2 · Ca. 4 lektioner');
  const ch3Start = text.indexOf('Kapitel 3 · Ca. 4 lektioner');
  const ch2Text = ch3Start > 0 ? text.slice(ch2Start, ch3Start) : text.slice(ch2Start);

  // Clean up whitespace artefacts from PDF extraction
  const clean = (s: string) =>
    s
      .replace(/\s{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  const focusWords = [
    'en kunstner',
    'et motiv',
    'et kunstværk',
    'en kunstnergruppe',
    'dyster',
    'positiv',
  ];

  return {
    intro: clean(
      'Skagensmalerne var en gruppe kunstnere fra Skandinavien, som bosatte sig og malede i Skagen ' +
        'omkring 1880-1900. Mange af kunstnerne boede på Brøndums Hotel i Skagen, hvor de nogle gange ' +
        'betalte for deres ophold ved at skænke hotellet et kunstværk. Kunstnergruppen malede motiver ' +
        'fra naturen og dagligdagen, og de var især optagede af lys og farver.'
    ),
    focusWords,
    sections: [
      {
        title: 'Michael Ancher (1849–1927)',
        body: clean(
          'Michael Ancher var en af malerne i kunstnergruppen. Han blev født på Bornholm og uddannet ' +
            'maler på Det Kongelige Danske Kunstakademi. Han har blandt andet malet "Redningsbåden køres ' +
            'gennem klitterne" (1883). Hans motiver var ofte fiskere og situationer fra havnen og stranden ' +
            'i Skagen. Mange af hans malerier er lidt dystre. Det skyldes måske, at han ville male hverdagen, ' +
            'som den var – også selvom det var uvejr, og der skete ulykker på stranden.'
        ),
      },
      {
        title: 'Anna Ancher (1859–1935)',
        body: clean(
          'Anna Ancher var den eneste af skagensmalerne, som var født i Skagen. De andre skagensmalere kom ' +
            'til Skagen som en del af kunstnergruppen. Anna Ancher malede ofte indendørs motiver med ' +
            'forskellige personer, der havde tilknytning til kunstnermiljøet og Skagen. Anna Ancher var gift ' +
            'med Michael Ancher, og hun malede ligesom ham motiver fra dagligdagen. Hun har fx malet ' +
            '"Pigen i køkkenet".'
        ),
      },
      {
        title: 'P.S. Krøyer (1851–1909)',
        body: clean(
          'Peder Severin Krøyer mødte i 1882 Michael og Anna Ancher i Paris. De tog sammen til Skagen. ' +
            'P.S. Krøyer er nok den mest kendte skagensmaler. Hans motiver var gladere og mere positive. ' +
            'Fx malede P.S. Krøyer motiver af fester, sommeraftner og solens lys. Maleriet "Sankt Hansblus ' +
            'på Skagen strand" (1906) er et af de sidste malerier Krøyer malede. Det forestiller Sankt Hans ' +
            'aften i Skagen, og personerne omkring bålet er P.S. Krøyers familie og venner.'
        ),
      },
      {
        title: 'Andre skagensmalere',
        body: clean(
          'De tre skagensmalere Anna og Michael Ancher samt P.S. Krøyer var de mest berømte malere fra ' +
            'Skagen. De tre kunstnere var dog ikke de eneste, der var inspireret af Skagen i slutningen af ' +
            '1800-tallet. Der var mange flere malere, der tog til Skagen for at male og mødes, og som siden ' +
            'blev berømte. Nogle af dem var Holger Drachmann, Marie Krøyer Alfvén, Carl Locher og ' +
            'Viggo Johansen.'
        ),
      },
    ],
    activities: [
      {
        title: 'Få mere viden om en skagensmaler',
        steps: [
          'Vælg, hvilken af følgende kunstnere I vil skrive en faktuel beretning om: Anna Ancher, Michael Ancher, P.S. Krøyer, Marie Krøyer Alfvén, eller Holger Drachmann.',
          'Udfyld de tre første punkter af en VØSLE.',
          'Søg efter informationer om jeres kunstner på Google og på Skagens Museums hjemmeside.',
          'Tag noter til de informationer, I finder frem til undervejs.',
        ],
      },
      {
        title: 'Skriv en fagtekst',
        steps: [
          'Lav en brainstorm med idéer til, hvad I vil have med i jeres faktuelle beretning.',
          'Find på en overskrift, der informerer om kunstneren og perioden.',
          'Skriv med jeres egne ord en indledning, hvor I præsenterer kunstneren.',
          'Vælg tre begivenheder fra kunstnerens liv og skriv dem i kronologisk rækkefølge.',
          'Gå sammen med andre grupper og læs jeres faktuelle beretninger højt for hinanden.',
        ],
      },
    ],
  };
}

let cachedContent: Chapter2Content | null = null;

export async function getChapter2Content(): Promise<Chapter2Content> {
  if (cachedContent) return cachedContent;

  try {
    const pdfPath = path.join(process.cwd(), 'data', 'skagensmalerne.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    cachedContent = extractChapter2(data.text);
  } catch {
    // Fallback to static content if PDF parsing fails
    cachedContent = extractChapter2('');
  }

  return cachedContent;
}

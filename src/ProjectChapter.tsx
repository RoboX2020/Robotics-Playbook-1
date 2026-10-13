import { CircuitDiagram } from './CircuitDiagram';
import { circuits } from './circuits';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
export type Lesson = {number:number;title:string;intro:string;objectives:string[];parts:string[];principles:string[];wiring:string[];procedure:string[];code:string;expected:string[];troubleshooting:string[];safety:string[];exercises:string[];checks:string[];sources:{title:string;url:string}[]};
export function ProjectChapter({lesson:l,onBack}:{lesson:Lesson;onBack:()=>void}) {
 const sections:[string,string[]][]=[['Learning objectives',l.objectives],['Parts list',l.parts],['How it works',l.principles],['Wiring diagram and connections',l.wiring],['Lab procedure',l.procedure]];
 return <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
 <button onClick={onBack} className="mb-8 flex items-center gap-2 font-black text-xs uppercase bg-black text-white px-4 py-2 rounded-lg"><ArrowLeft className="w-4 h-4"/>Back to Dashboard</button>
 <header className="mb-12"><div className="inline-block bg-[#6BCB77] border-4 border-black px-4 py-1 rounded-full font-black text-xs mb-4">Chapter {String(l.number).padStart(2, '0')}</div><h1 className="text-4xl md:text-5xl font-black mb-4 uppercase underline decoration-[#6BCB77]">{l.title}</h1><p className="text-lg font-bold">{l.intro}</p></header>
 {sections.map(([title,items])=><section key={title} className="mb-12"><h2 className="text-2xl font-black mb-6 uppercase">{title}</h2><div className="doodle-card p-6 bg-white"><ol className="list-decimal pl-5 space-y-4 font-medium">{items.map((item,i)=><li key={i}>{item}</li>)}</ol></div></section>)}
 <section className="mb-12"><h2 className="text-2xl font-black mb-6 uppercase">The code</h2><p className="font-medium">Copy into Arduino IDE and select Arduino Uno. This page does not compile, upload or connect to your hardware.</p><CircuitDiagram number={l.number} connections={circuits[l.number]}/><CodeBlock code={l.code} downloadHref={`/sketches/chapter${l.number}/chapter${l.number}.ino`}/></section>
 {([['Expected results',l.expected],['Troubleshooting',l.troubleshooting],['Safety and good practice',l.safety],['Your turn',l.exercises],['Student check',l.checks]] as [string,string[]][]).map(([title,items])=><section key={title} className="mb-12"><h2 className="text-2xl font-black mb-6 uppercase">{title}</h2><div className="doodle-card p-6 bg-white"><ul className="list-disc pl-5 space-y-4 font-medium">{items.map((item,i)=><li key={i}>{item}</li>)}</ul></div></section>)}
 <section className="mb-12"><h2 className="text-2xl font-black mb-6 uppercase">Source notes</h2><div className="doodle-card p-6"><p className="mb-4">These support the principles and component limits. Verify the datasheet of your exact module; clone boards and wire colours can differ.</p><ul className="space-y-3">{l.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline break-words">{s.title}</a></li>)}</ul></div></section>
 <button onClick={onBack} className="doodle-button w-full">Finish chapter {String(l.number).padStart(2, '0')}</button>
 </div>;
}

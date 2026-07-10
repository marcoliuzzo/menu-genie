import SlideShell from "../SlideShell";

const Slide04Market = () => (
  <SlideShell eyebrow="Mercato">
    <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      Un mercato in crescita.
      <span className="block gradient-primary-text mt-2">Un problema ancora irrisolto.</span>
    </h2>
    <div className="mt-16 relative h-[360px] flex items-center justify-center">
      <div className="absolute h-[340px] w-[340px] rounded-full border-2 border-primary/20 flex items-start justify-center pt-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">TAM</span>
      </div>
      <div className="absolute h-[230px] w-[230px] rounded-full border-2 border-primary/40 flex items-start justify-center pt-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">SAM</span>
      </div>
      <div className="absolute h-[130px] w-[130px] rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
        <span className="text-sm font-bold uppercase tracking-widest text-accent">SOM</span>
      </div>
    </div>
  </SlideShell>
);

export default Slide04Market;

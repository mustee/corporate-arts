/* Corporate Arts — Tweaks panel app.
   Drives CSS variables / data-attributes on the (vanilla) page. */

const CA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f93399",
  "intensity": "balanced",
  "motion": true
}/*EDITMODE-END*/;

const ACCENTS = ["#f93399", "#00b9f2", "#ffcc3b", "#e52c1a"];

function CATweaksApp() {
  const [t, setTweak] = useTweaks(CA_TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    // keep accent-2 / accent-3 complementary to chosen accent
    const others = ACCENTS.filter((c) => c !== t.accent);
    document.documentElement.style.setProperty('--accent-2', others[0] || '#00b9f2');
    document.documentElement.style.setProperty('--accent-3', others[1] || '#ffcc3b');
  }, [t.accent]);

  React.useEffect(() => {
    document.body.setAttribute('data-intensity', t.intensity);
  }, [t.intensity]);

  React.useEffect(() => {
    document.body.setAttribute('data-motion', t.motion ? 'on' : 'off');
  }, [t.motion]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Colour" />
      <TweakColor
        label="Primary accent"
        value={t.accent}
        options={ACCENTS}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakRadio
        label="Intensity"
        value={t.intensity}
        options={['restrained', 'balanced', 'bold']}
        onChange={(v) => setTweak('intensity', v)}
      />
      <TweakSection label="Motion" />
      <TweakToggle
        label="Animations"
        value={t.motion}
        onChange={(v) => setTweak('motion', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<CATweaksApp />);

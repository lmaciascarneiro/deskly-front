export const WorkspaceIllustration = () => {
  return (
    <svg viewBox="0 0 360 300" className="h-full w-full" aria-hidden="true">
      <ellipse cx="180" cy="270" rx="140" ry="16" fill="#E0E4FF" />
      <rect x="60" y="150" width="240" height="14" rx="7" fill="#0B1220" />
      <rect x="70" y="164" width="14" height="70" fill="#0B1220" />
      <rect x="276" y="164" width="14" height="70" fill="#0B1220" />

      <rect x="90" y="90" width="130" height="82" rx="10" fill="#4F46E5" />
      <rect x="98" y="98" width="114" height="58" rx="4" fill="#EEF0FF" />
      <rect x="98" y="98" width="114" height="58" rx="4" fill="url(#workspace-illustration-screen)" opacity="0.5" />

      <rect x="230" y="120" width="46" height="34" rx="6" fill="#A3E635" />
      <circle cx="253" cy="112" r="7" fill="#A3E635" />

      <circle cx="55" cy="120" r="20" fill="#FDE68A" />
      <rect x="46" y="130" width="18" height="24" rx="4" fill="#0B1220" />

      <path d="M300 200c0-22 18-40 40-40" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="340" cy="150" r="10" fill="#4F46E5" />

      <defs>
        <linearGradient id="workspace-illustration-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#A3E635" />
        </linearGradient>
      </defs>
    </svg>
  );
};

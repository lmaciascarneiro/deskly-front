export const AppFooter = () => {
  return (
    <footer className="bg-ink px-6 py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display flex h-8 w-8 items-center justify-center rounded-xl bg-lime text-sm font-bold text-lime-foreground">
              D
            </span>
            <span className="font-display text-lg font-bold">Deskly</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-white/60">
            Workspaces sob demanda para gente que trabalha de qualquer lugar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-[13px] text-white/60 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="font-display font-semibold text-white">Produto</p>
            <p>Espaços</p>
            <p>Como funciona</p>
          </div>
          <div className="space-y-2">
            <p className="font-display font-semibold text-white">Empresa</p>
            <p>Sobre</p>
            <p>Blog</p>
          </div>
          <div className="space-y-2">
            <p className="font-display font-semibold text-white">Legal</p>
            <p>Privacidade</p>
            <p>Termos</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
        &copy; {new Date().getFullYear()} Deskly
      </div>
    </footer>
  );
};

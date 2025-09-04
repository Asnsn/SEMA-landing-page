import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                S
              </div>
              <span className="text-xl font-bold text-primary">SEMA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformando vidas através do esporte e da cultura em Hortolândia há mais de 15 anos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Atividades</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/atividades/ballet" className="text-muted-foreground hover:text-primary transition-colors">
                  Ballet
                </Link>
              </li>
              <li>
                <Link href="/atividades/futebol" className="text-muted-foreground hover:text-primary transition-colors">
                  Futebol
                </Link>
              </li>
              <li>
                <Link href="/atividades/judo" className="text-muted-foreground hover:text-primary transition-colors">
                  Judô
                </Link>
              </li>
              <li>
                <Link
                  href="/atividades/capoeira"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Capoeira
                </Link>
              </li>
              <li>
                <Link href="/atividades/volei" className="text-muted-foreground hover:text-primary transition-colors">
                  Vôlei
                </Link>
              </li>
              <li>
                <Link href="/atividades/natacao" className="text-muted-foreground hover:text-primary transition-colors">
                  Natação
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/atividades" className="text-muted-foreground hover:text-primary transition-colors">
                  Todas as Atividades
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Como Ajudar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Rua das Flores, 123</p>
              <p>Hortolândia - SP</p>
              <p>CEP: 13184-000</p>
              <p>Tel: (19) 3865-1234</p>
              <p>contato@sema.org.br</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SEMA - Todos os direitos reservados. Desenvolvido com ❤️ para transformar vidas.</p>
        </div>
      </div>
    </footer>
  )
}

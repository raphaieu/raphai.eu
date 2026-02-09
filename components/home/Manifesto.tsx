import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">
            Manifesto
          </h2>
          <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed space-y-8">
            <p className="font-semibold text-2xl text-center mb-12" style={{ color: '#004e64' }}>
              "Ainda não sou. Mas ajo como quem é."
            </p>

            <p className="text-lg">
              <strong>
                Porque esperar se tornar é desculpa de quem não começou. Ser é
                prática, não promessa.
              </strong>
            </p>

            <p className="text-lg">
              <strong>
                Eu construo antes de me sentir pronto. Porque o mundo não
                espera. O mercado não espera. E a liberdade muito menos.
              </strong>
            </p>

            <p className="text-lg">
              <strong>
                Aqui não tem espaço pra culto ao perfeccionismo, nem pra fetiche
                de validação. Disciplina é mais sagrada que motivação. Autonomia
                vale mais que status.
              </strong>
            </p>

            <p className="text-lg">
              <strong>
                O que tá no meu controle? Só três coisas: O que penso. O que
                sinto. O que faço. O resto? Ruído.
              </strong>
            </p>

            <p className="text-lg">
              <strong>
                Então eu faço. Faço até ser. Faço até viver. Faço até
                transcender essa versão antiga de mim, que já não me serve.
              </strong>
            </p>

            <p className="text-lg font-semibold text-center mt-12" style={{ color: '#004e64' }}>
              <strong>
                Liberdade não é destino. É construção. E eu construo a minha.
              </strong>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const shuffle = (items) =>
  [...items].sort(() => Math.random() - 0.5);

const q = (
  id,
  stage,
  level,
  subject,
  type,
  question,
  answer,
  explanation,
  distractors = []
) => ({
  id,
  stage,
  level,
  subject,
  type,
  question,
  answer: String(answer),
  accepted: [String(answer)],
  explanation,
  options:
    type === "multiple-choice"
      ? shuffle(
          [
            ...new Set([
              String(answer),
              ...distractors.map(String),
            ]),
          ].slice(0, 4)
        )
      : [],
});

const banks = [];

const typeAt = (i) =>
  i % 2 === 0 ? "multiple-choice" : "typed";

/* FUNDAMENTAL II — FÁCIL: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const a = i * 7 + 5;
  const b = i * 3 + 2;
  const sum = a + b;

  banks.push(
    q(
      `f2-e-sum-${i}`,
      "fundamental-ii",
      "easy",
      "Aritmética",
      typeAt(i),
      `Quanto é ${a} + ${b}?`,
      sum,
      `Somamos as unidades e depois as dezenas: ${a} + ${b} = ${sum}.`,
      [sum + 2, sum - 3, sum + 10]
    )
  );

  const n = 20 + i * 10;
  const pct = ((i % 4) + 1) * 10;
  const ans = (n * pct) / 100;

  banks.push(
    q(
      `f2-e-pct-${i}`,
      "fundamental-ii",
      "easy",
      "Porcentagem",
      typeAt(i + 1),
      `Quanto é ${pct}% de ${n}?`,
      ans,
      `Primeiro transformamos ${pct}% em ${
        pct / 100
      }. Depois calculamos ${pct / 100} × ${n} = ${ans}.`,
      [ans + 5, ans * 2, Math.max(1, ans - 2)]
    )
  );

  const side = i + 3;
  const perimeter = side * 4;

  banks.push(
    q(
      `f2-e-per-${i}`,
      "fundamental-ii",
      "easy",
      "Geometria",
      typeAt(i),
      `Qual é o perímetro de um quadrado com lado de ${side} cm?`,
      perimeter,
      `O quadrado possui quatro lados iguais. Portanto, P = 4 × ${side} = ${perimeter} cm.`,
      [side * 2, side * side, perimeter + 4]
    )
  );

  const denominator = (i % 4) + 2;
  const whole = denominator * (i + 2);
  const numerator = denominator - 1;
  const fraction = (whole / denominator) * numerator;

  banks.push(
    q(
      `f2-e-frac-${i}`,
      "fundamental-ii",
      "easy",
      "Frações",
      typeAt(i + 1),
      `Quanto é ${numerator}/${denominator} de ${whole}?`,
      fraction,
      `Dividimos ${whole} por ${denominator}, obtendo ${
        whole / denominator
      }. Depois multiplicamos por ${numerator}: ${fraction}.`,
      [whole / denominator, fraction + numerator, whole - numerator]
    )
  );

  const average = i + 4;
  const values = [average - 2, average, average + 2];

  banks.push(
    q(
      `f2-e-avg-${i}`,
      "fundamental-ii",
      "easy",
      "Estatística",
      typeAt(i),
      `Qual é a média de ${values.join(", ")}?`,
      average,
      `Somamos os valores: ${values.join(
        " + "
      )} = ${average * 3}. Depois dividimos por 3: ${
        average * 3
      } ÷ 3 = ${average}.`,
      [average - 1, average + 2, average * 2]
    )
  );
}

/* FUNDAMENTAL II — MÉDIO: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const x = i + 2;
  const c = i * 2 + 1;
  const result = 2 * x + c;

  banks.push(
    q(
      `f2-m-eq-${i}`,
      "fundamental-ii",
      "medium",
      "Álgebra",
      typeAt(i),
      `Resolva a equação: 2x + ${c} = ${result}.`,
      x,
      `Subtraímos ${c} dos dois lados: 2x = ${
        result - c
      }. Depois dividimos por 2: x = ${x}.`,
      [x + 2, x - 1, 2 * x]
    )
  );

  const base = i + 6;
  const height = i + 2;
  const area = (base * height) / 2;

  banks.push(
    q(
      `f2-m-tri-${i}`,
      "fundamental-ii",
      "medium",
      "Geometria",
      typeAt(i + 1),
      `Qual é a área de um triângulo com base ${base} cm e altura ${height} cm?`,
      area,
      `Usamos A = base × altura ÷ 2. Portanto, A = ${base} × ${height} ÷ 2 = ${area} cm².`,
      [base * height, area + height, area - 2]
    )
  );

  const price = 100 + i * 20;
  const discount = 10 + (i % 3) * 5;
  const discountValue = (price * discount) / 100;
  const finalPrice = price - discountValue;

  banks.push(
    q(
      `f2-m-disc-${i}`,
      "fundamental-ii",
      "medium",
      "Porcentagem",
      typeAt(i),
      `Um produto de R$ ${price} recebeu desconto de ${discount}%. Qual é o preço final?`,
      finalPrice,
      `O desconto é ${discount}% de ${price}: ${discountValue}. Depois subtraímos: ${price} − ${discountValue} = R$ ${finalPrice}.`,
      [price - discount, finalPrice + 10, discountValue]
    )
  );

  const first = i;
  const step = (i % 4) + 2;
  const next = first + step * 4;

  banks.push(
    q(
      `f2-m-seq-${i}`,
      "fundamental-ii",
      "medium",
      "Sequências",
      typeAt(i + 1),
      `Complete a sequência: ${first}, ${
        first + step
      }, ${first + 2 * step}, ${first + 3 * step}, __.`,
      next,
      `A sequência aumenta de ${step} em ${step}. Somamos ${step} ao último termo: ${
        first + 3 * step
      } + ${step} = ${next}.`,
      [next + step, next - 1, first + step * 5]
    )
  );

  const red = (i % 4) + 1;
  const total = red + (i % 3) + 3;
  const probability = `${red}/${total}`;

  banks.push(
    q(
      `f2-m-prob-${i}`,
      "fundamental-ii",
      "medium",
      "Probabilidade",
      typeAt(i),
      `Uma sacola tem ${red} bolas vermelhas e ${
        total - red
      } azuis. Qual é a probabilidade de retirar uma vermelha?`,
      probability,
      `Existem ${red} casos favoráveis entre ${total} resultados possíveis. Assim, P = ${red}/${total}.`,
      [
        `${total - red}/${total}`,
        `1/${total}`,
        `${red}/${total + 1}`,
      ]
    )
  );
}

/* FUNDAMENTAL II — DIFÍCIL: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const x = i + 3;
  const y = i + 1;
  const sum = x + y;
  const difference = x - y;

  banks.push(
    q(
      `f2-h-sys-${i}`,
      "fundamental-ii",
      "hard",
      "Sistemas",
      typeAt(i),
      `No sistema x + y = ${sum} e x − y = ${difference}, qual é o valor de x?`,
      x,
      `Somamos as equações. Os termos y e −y se anulam: 2x = ${
        sum + difference
      }. Dividindo por 2, x = ${x}.`,
      [y, sum, x + 1]
    )
  );

  const base = i + 2;
  const power = base ** 2;
  const result = power - i;

  banks.push(
    q(
      `f2-h-pow-${i}`,
      "fundamental-ii",
      "hard",
      "Potenciação",
      typeAt(i + 1),
      `Calcule ${base}² − ${i}.`,
      result,
      `Primeiro calculamos a potência: ${base}² = ${power}. Depois subtraímos ${i}: ${power} − ${i} = ${result}.`,
      [power, power + i, base * 2 - i]
    )
  );

  const radius = i + 2;
  const circumference = 2 * 3.14 * radius;
  const circumferenceAnswer = circumference
    .toFixed(2)
    .replace(".00", "");

  banks.push(
    q(
      `f2-h-circ-${i}`,
      "fundamental-ii",
      "hard",
      "Geometria",
      typeAt(i),
      `Usando π = 3,14, qual é o comprimento de uma circunferência com raio ${radius} cm?`,
      circumferenceAnswer,
      `Usamos C = 2πr. Assim, C = 2 × 3,14 × ${radius} = ${circumference.toFixed(
        2
      )} cm.`,
      [
        (3.14 * radius).toFixed(2),
        (2 * radius).toFixed(2),
        (3.14 * radius * radius).toFixed(2),
      ]
    )
  );

  const total = 40 + i * 5;
  const smallerPart = (total * 2) / 5;

  banks.push(
    q(
      `f2-h-ratio-${i}`,
      "fundamental-ii",
      "hard",
      "Razão",
      typeAt(i + 1),
      `Divida ${total} na razão 2:3. Qual é a menor parte?`,
      smallerPart,
      `Somamos os termos da razão: 2 + 3 = 5. A menor parte corresponde a 2/5. Portanto, ${total} × 2/5 = ${smallerPart}.`,
      [total - smallerPart, total / 5, smallerPart + 2]
    )
  );

  const value = i + 4;
  const expression = 3 * value - 2;

  banks.push(
    q(
      `f2-h-expr-${i}`,
      "fundamental-ii",
      "hard",
      "Expressões",
      typeAt(i),
      `Calcule 3a − 2 para a = ${value}.`,
      expression,
      `Substituímos a por ${value}: 3 × ${value} − 2 = ${
        3 * value
      } − 2 = ${expression}.`,
      [3 * value, expression + 2, value - 2]
    )
  );
}

/* ENSINO MÉDIO — FÁCIL: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const x = i;
  const fx = 2 * x + 3;

  banks.push(
    q(
      `em-e-func-${i}`,
      "ensino-medio",
      "easy",
      "Funções",
      typeAt(i),
      `Se f(x) = 2x + 3, quanto vale f(${x})?`,
      fx,
      `Substituímos x por ${x}: f(${x}) = 2 × ${x} + 3 = ${fx}.`,
      [fx - 3, fx + 2, 2 * x]
    )
  );

  const firstTerm = i + 2;
  const ratio = 3;
  const eighthTerm = firstTerm + 7 * ratio;

  banks.push(
    q(
      `em-e-pa-${i}`,
      "ensino-medio",
      "easy",
      "Progressão aritmética",
      typeAt(i + 1),
      `Em uma PA, a₁ = ${firstTerm} e r = 3. Qual é a₈?`,
      eighthTerm,
      `Usamos aₙ = a₁ + (n − 1)r. Assim, a₈ = ${firstTerm} + 7 × 3 = ${eighthTerm}.`,
      [eighthTerm - 3, eighthTerm + 3, firstTerm * 8]
    )
  );

  const root1 = (i % 5) + 1;
  const root2 = root1 + 2;
  const rootSum = root1 + root2;
  const rootProduct = root1 * root2;

  banks.push(
    q(
      `em-e-quad-${i}`,
      "ensino-medio",
      "easy",
      "Equação quadrática",
      typeAt(i),
      `Uma das raízes de x² − ${rootSum}x + ${rootProduct} = 0 é ${root1}. Qual é a outra?`,
      root2,
      `Fatoramos a equação: (x − ${root1})(x − ${root2}) = 0. Portanto, a outra raiz é ${root2}.`,
      [root1, rootSum, rootProduct]
    )
  );

  const leg1 = 3 * i;
  const leg2 = 4 * i;
  const hypotenuse = 5 * i;

  banks.push(
    q(
      `em-e-pit-${i}`,
      "ensino-medio",
      "easy",
      "Geometria",
      typeAt(i + 1),
      `Um triângulo retângulo tem catetos ${leg1} e ${leg2}. Qual é a hipotenusa?`,
      hypotenuse,
      `Usamos h² = ${leg1}² + ${leg2}². Calculando e extraindo a raiz quadrada, encontramos h = ${hypotenuse}.`,
      [leg1 + leg2, hypotenuse - i, hypotenuse + i]
    )
  );

  const amount = 500 + i * 100;
  const interest = amount * 0.02;

  banks.push(
    q(
      `em-e-int-${i}`,
      "ensino-medio",
      "easy",
      "Matemática financeira",
      typeAt(i),
      `Qual é o juro de 2% sobre R$ ${amount} em um mês?`,
      interest,
      `Transformamos 2% em 0,02. Depois calculamos ${amount} × 0,02 = R$ ${interest}.`,
      [interest * 2, amount - interest, 20]
    )
  );
}

/* ENSINO MÉDIO — MÉDIO: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const x = i + 1;
  const functionValue = 2 * x * x - 3;

  banks.push(
    q(
      `em-m-func2-${i}`,
      "ensino-medio",
      "medium",
      "Função quadrática",
      typeAt(i),
      `Se f(x) = 2x² − 3, calcule f(${x}).`,
      functionValue,
      `Substituímos x por ${x}: f(${x}) = 2 × ${x}² − 3 = 2 × ${
        x * x
      } − 3 = ${functionValue}.`,
      [functionValue + 3, 2 * x - 3, functionValue - 2]
    )
  );

  const firstTerm = i + 1;
  const fifthTerm = firstTerm * 2 ** 4;

  banks.push(
    q(
      `em-m-pg-${i}`,
      "ensino-medio",
      "medium",
      "Progressão geométrica",
      typeAt(i + 1),
      `Em uma PG, a₁ = ${firstTerm} e q = 2. Qual é a₅?`,
      fifthTerm,
      `Usamos aₙ = a₁ × qⁿ⁻¹. Assim, a₅ = ${firstTerm} × 2⁴ = ${fifthTerm}.`,
      [firstTerm * 8, fifthTerm + firstTerm, fifthTerm / 2]
    )
  );

  const x1 = i;
  const y1 = i + 1;
  const x2 = i + 3;
  const y2 = i + 5;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const squaredDistance = dx * dx + dy * dy;

  banks.push(
    q(
      `em-m-dist-${i}`,
      "ensino-medio",
      "medium",
      "Geometria analítica",
      typeAt(i),
      `Qual é o quadrado da distância entre A(${x1},${y1}) e B(${x2},${y2})?`,
      squaredDistance,
      `Calculamos d² = (x₂ − x₁)² + (y₂ − y₁)². Assim, d² = ${dx}² + ${dy}² = ${squaredDistance}.`,
      [dx + dy, dx * dx, dy * dy]
    )
  );

  const total = i + 9;
  const favorable = (i % 4) + 2;
  const probability = `${favorable}/${total}`;

  banks.push(
    q(
      `em-m-prob-${i}`,
      "ensino-medio",
      "medium",
      "Probabilidade",
      typeAt(i + 1),
      `Em ${total} resultados equiprováveis, ${favorable} são favoráveis. Qual é a probabilidade?`,
      probability,
      `Dividimos os casos favoráveis pelos casos possíveis: P = ${favorable}/${total}.`,
      [
        `${total - favorable}/${total}`,
        `1/${total}`,
        `${favorable}/${total + 1}`,
      ]
    )
  );

  const angle = i % 2 === 0 ? 30 : 60;
  const sine = angle === 30 ? "1/2" : "√3/2";

  banks.push(
    q(
      `em-m-trig-${i}`,
      "ensino-medio",
      "medium",
      "Trigonometria",
      typeAt(i),
      `Qual é o seno de ${angle}°?`,
      sine,
      `Esse é um ângulo notável. Pela tabela trigonométrica, sen(${angle}°) = ${sine}.`,
      angle === 30
        ? ["√3/2", "1", "0"]
        : ["1/2", "1", "0"]
    )
  );
}

/* ENSINO MÉDIO — DIFÍCIL: 50 QUESTÕES */

for (let i = 1; i <= 10; i++) {
  const people = i + 4;
  const combinations = (people * (people - 1)) / 2;

  banks.push(
    q(
      `em-h-comb-${i}`,
      "ensino-medio",
      "hard",
      "Combinatória",
      typeAt(i),
      `De quantas maneiras podemos escolher 2 pessoas entre ${people}?`,
      combinations,
      `Usamos C(${people},2) = ${people}! ÷ [2! × (${
        people - 2
      })!]. Simplificando: ${people} × ${
        people - 1
      } ÷ 2 = ${combinations}.`,
      [people * 2, combinations + people, people * (people - 1)]
    )
  );

  const exponent = i + 2;
  const power = 2 ** exponent;

  banks.push(
    q(
      `em-h-exp-${i}`,
      "ensino-medio",
      "hard",
      "Função exponencial",
      typeAt(i + 1),
      `Resolva a equação 2ˣ = ${power}.`,
      exponent,
      `Escrevemos ${power} como potência de 2: ${power} = 2^${exponent}. Como as bases são iguais, x = ${exponent}.`,
      [exponent + 1, power / 2, exponent * 2]
    )
  );

  const root1 = (i % 4) + 1;
  const root2 = root1 + 3;
  const rootSum = root1 + root2;
  const rootProduct = root1 * root2;

  banks.push(
    q(
      `em-h-roots-${i}`,
      "ensino-medio",
      "hard",
      "Equação quadrática",
      typeAt(i),
      `Qual é a maior raiz de x² − ${rootSum}x + ${rootProduct} = 0?`,
      root2,
      `Fatoramos: (x − ${root1})(x − ${root2}) = 0. Assim, as raízes são ${root1} e ${root2}; a maior é ${root2}.`,
      [root1, rootSum, rootProduct]
    )
  );

  const firstTerm = i + 3;
  const ratio = (i % 3) + 2;
  const twentiethTerm = firstTerm + 19 * ratio;

  banks.push(
    q(
      `em-h-pa-${i}`,
      "ensino-medio",
      "hard",
      "Progressão aritmética",
      typeAt(i + 1),
      `Em uma PA, a₁ = ${firstTerm} e r = ${ratio}. Qual é a₂₀?`,
      twentiethTerm,
      `Usamos aₙ = a₁ + (n − 1)r. Portanto, a₂₀ = ${firstTerm} + 19 × ${ratio} = ${twentiethTerm}.`,
      [
        twentiethTerm - ratio,
        twentiethTerm + ratio,
        firstTerm * 20,
      ]
    )
  );

  const radius = i + 2;
  const area = 3.14 * radius * radius;
  const areaAnswer = area.toFixed(2).replace(".00", "");

  banks.push(
    q(
      `em-h-circle-${i}`,
      "ensino-medio",
      "hard",
      "Geometria plana",
      typeAt(i),
      `Usando π = 3,14, qual é a área de um círculo com raio ${radius}?`,
      areaAnswer,
      `Usamos A = πr². Assim, A = 3,14 × ${radius}² = 3,14 × ${
        radius * radius
      } = ${area.toFixed(2)}.`,
      [
        (2 * 3.14 * radius).toFixed(2),
        (3.14 * radius).toFixed(2),
        (area + radius).toFixed(2),
      ]
    )
  );
}

export const questions = banks;

export function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, ".");
}

export function getQuestions(stage, level) {
  return questions.filter(
    (item) =>
      item.stage === stage && item.level === level
  );
}

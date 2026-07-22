# Comisión por bandas frente a comisión marginal por tramos

Fecha de verificación: 21 de julio de 2026.

## Pregunta investigada

¿Qué diferencia existe entre elegir una sola tasa de comisión según el precio total del evento y aplicar tasas decrecientes a distintas porciones de ese precio?

## Respuesta ejecutiva

Los dos modelos permiten que los eventos de menor precio tengan un porcentaje mayor y los eventos de mayor precio uno menor. La diferencia está en **qué importe recibe la tasa**:

- En el modelo **por bandas**, el precio total decide una única tasa y esa tasa se aplica a todo el precio.
- En el modelo **marginal por tramos**, cada porción del precio conserva la tasa de su tramo; solo el excedente pasa a la tasa siguiente.

El primer modelo es más sencillo de explicar, pero puede producir un salto en el umbral: cobrar S/1 más podría reducir bruscamente la comisión total. El modelo marginal necesita un cálculo más detallado, pero evita esa caída y reduce gradualmente el porcentaje efectivo.

## Evidencia de que son mecanismos reales

La tabla oficial de tarifas de Amazon muestra ambos mecanismos, dependiendo de la categoría:

- **Una tasa elegida por el precio total:** en “Cortacéspedes y quitanieves”, Amazon publica 15 % cuando el precio total es de hasta US$500 y 8 % cuando supera US$500. La tasa seleccionada se aplica al precio total. “Alimentación y comida gourmet” también cambia la tasa según que el precio total esté hasta o por encima de US$15.
- **Tasas aplicadas a porciones:** en “Electrodomésticos compactos”, Amazon publica 15 % para la porción de hasta US$300 y 8 % para cualquier porción superior a US$300. En “Arte”, la tabla divide el precio en más porciones con tasas sucesivamente menores.

Fuente primaria: [Amazon — Tarifas y precios para vendedores](https://sell.amazon.com/es/pricing).

Amazon es aquí un **ejemplo real de mecánica**, no una recomendación de tasas, umbrales ni política comercial para Nexo.

## Manera 1: una tasa para todo el precio según su banda

Primero se observa el precio total. Después se elige una tasa y se aplica esa única tasa a todo el importe.

Ejemplo **hipotético**, únicamente para explicar la fórmula de Nexo:

| Precio total del evento | Tasa aplicable a todo el precio |
|---:|---:|
| Hasta S/5,000 | 10 % |
| Más de S/5,000 | 6 % |

Los resultados serían:

| Precio del evento | Cálculo | Comisión |
|---:|---:|---:|
| S/5,000 | S/5,000 × 10 % | S/500.00 |
| S/5,001 | S/5,001 × 6 % | S/300.06 |

Aunque la venta aumentó S/1, la comisión disminuyó S/199.94. A esto se le puede llamar un **salto o efecto acantilado en el umbral**. Es una consecuencia matemática del ejemplo propuesto para Nexo, no una afirmación de que Amazon haya fijado sus bandas con ese propósito.

### Ventajas

- La empresa puede identificar rápidamente su porcentaje mirando el precio total.
- El cálculo requiere una sola multiplicación.

### Riesgos

- Dos eventos casi idénticos, a ambos lados del límite, pueden pagar comisiones muy diferentes.
- Cerca del umbral puede aparecer un incentivo para modificar el precio con el fin de entrar en la banda más conveniente.
- Si la tasa baja lo suficiente, Nexo puede ganar menos comisión en una venta de mayor valor.

## Manera 2: comisión marginal o decreciente por tramos

El precio se divide en porciones. Cada porción paga la tasa de su propio tramo; cruzar un límite **no cambia retroactivamente** la comisión sobre la porción anterior.

Ejemplo **hipotético**, usando los mismos límites y tasas:

| Porción del precio | Tasa aplicable a esa porción |
|---:|---:|
| Primeros S/5,000 | 10 % |
| Importe que exceda S/5,000 | 6 % |

Los resultados serían:

| Precio del evento | Cálculo | Comisión | Tasa efectiva |
|---:|---:|---:|---:|
| S/5,000 | S/5,000 × 10 % | S/500.00 | 10 % |
| S/5,001 | S/5,000 × 10 % + S/1 × 6 % | S/500.06 | ≈ 10 % |
| S/10,000 | S/5,000 × 10 % + S/5,000 × 6 % | S/800.00 | 8 % |

Cuando el precio pasa de S/5,000 a S/5,001, solo el sol adicional paga 6 %. Por eso la comisión crece de S/500 a S/500.06, en vez de caer. Al aumentar el precio, la **tasa efectiva** —comisión total dividida entre precio total— disminuye gradualmente.

La misma lógica aparece en la explicación oficial británica del impuesto sobre la renta: el importe depende de cuánto ingreso cae dentro de cada banda. Esa fuente sirve solo como explicación adicional del cálculo marginal; **no propone un modelo comercial para Nexo**: [GOV.UK — Income Tax rates and Personal Allowances](https://www.gov.uk/income-tax-rates).

### Ventajas

- Evita saltos bruscos al cruzar los límites.
- Una venta de mayor precio no produce una comisión total menor bajo tasas positivas.
- Cumple la intención de reducir el porcentaje efectivo en eventos caros sin volver a calcular toda la venta con la tasa baja.

### Riesgos

- La fórmula y la cotización deben mostrar el desglose para que la empresa la entienda.
- Requiere definir con precisión los límites, las tasas y qué conceptos forman el precio base.

## Comparación directa para Nexo

| Criterio | Tasa única por banda | Marginal por tramos |
|---|---|---|
| ¿Qué determina el precio total? | Una tasa para todo el importe | Cuánto importe cae en cada tramo |
| Al superar un umbral | Todo el precio cambia de tasa | Solo el excedente cambia de tasa |
| ¿Puede caer la comisión total al subir el precio? | Sí, si la nueva tasa es suficientemente menor | No, mientras las tasas sean positivas |
| Facilidad de cálculo | Mayor | Menor; conviene mostrar desglose |
| Reducción para eventos caros | Brusca | Gradual en la tasa efectiva |

## Conclusión e inferencia para Nexo

Como inferencia de diseño —no como hecho externo ni decisión ya aprobada—, el modelo **marginal por tramos** expresa con más consistencia la sugerencia “precios bajos, comisión más alta; precios altos, comisión más baja”. Permite reducir la tasa de las porciones altas sin que una empresa pague menos comisión total por vender un evento apenas más caro.

Esta investigación no define los porcentajes, los límites de los tramos ni la base exacta de cálculo. Esas variables necesitan validación con ticket promedio, costos de procesamiento, margen operativo, cancelaciones y disposición a pagar de las empresas.

## Fuentes primarias

- [Amazon — Tarifas y precios para vendedores](https://sell.amazon.com/es/pricing).
- [eBay — Selling fees](https://www.ebay.com/help/selling/selling-fees/store-fees?id=4822). La tabla ofrece ejemplos adicionales tanto de tasas seleccionadas por el precio total como de tasas aplicadas a la porción que supera un límite.
- [GOV.UK — Income Tax rates and Personal Allowances](https://www.gov.uk/income-tax-rates). Se usa únicamente para corroborar la mecánica de importes que caen dentro de distintas bandas.

import React, { useMemo, useState } from "react";
import "./App.css";

const BUILT_IN_FUNCTIONS = [
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "sqrt",
  "log",
  "abs",
  "exp",
  "floor",
  "ceil",
  "pow",
];

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function pretty(value) {
  if (!Number.isFinite(value)) return "undefined";
  if (Math.abs(value) < 1e-12) return "0";
  if (Math.abs(value) >= 1e6 || Math.abs(value) <= 1e-6) return value.toExponential(6);
  return value.toFixed(8).replace(/\.?0+$/, "");
}

function normalizeExpression(expression) {
  return expression.trim().toLowerCase().replace(/\s+/g, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function insertSimpleMultiplication(source, variable) {
  return source
    .replace(new RegExp(`(\\d)(${variable})`, "g"), "$1*$2")
    .replace(new RegExp(`(${variable})\\(`, "g"), "$1*(")
    .replace(/(\d)\(/g, "$1*(")
    .replace(/\)(\d)/g, ")*$1")
    .replace(new RegExp(`\\)(${variable})`, "g"), ")*$1")
    .replace(/\)\(/g, ")*(");
}

function compileExpression(expression, variable) {
  const raw = expression;
  if (!/^[0-9a-zA-Z+\-*/^().,\s]+$/.test(raw)) {
    throw new Error("Use only numbers, letters, and standard math operators.");
  }

  const cleaned = insertSimpleMultiplication(normalizeExpression(raw), variable);
  let jsExpression = cleaned.replace(/\^/g, "**");

  BUILT_IN_FUNCTIONS.forEach((fn) => {
    const pattern = new RegExp(`\\b${fn}\\b`, "g");
    jsExpression = jsExpression.replace(pattern, `Math.${fn}`);
  });

  jsExpression = jsExpression.replace(/\bpi\b/g, "Math.PI").replace(/\be\b/g, "Math.E");

  const executable = new Function(variable, `"use strict"; return (${jsExpression});`);

  return (x) => {
    const value = executable(x);
    if (!Number.isFinite(value)) throw new Error("Expression produced a non-finite value.");
    return value;
  };
}

function centralDerivative(fn, x) {
  const h = 1e-5;
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

function simpsonIntegral(fn, a, b, slices = 400) {
  const n = slices % 2 === 0 ? slices : slices + 1;
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);

  for (let i = 1; i < n; i += 1) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * fn(x);
  }

  return (h / 3) * sum;
}

function antiderivativeHint(expression, variable) {
  const ex = normalizeExpression(expression);

  if (ex === variable) return `0.5${variable}^2 + C`;
  if (ex === `sin(${variable})`) return `-cos(${variable}) + C`;
  if (ex === `cos(${variable})`) return `sin(${variable}) + C`;
  if (ex === `exp(${variable})`) return `exp(${variable}) + C`;
  if (ex === `1/${variable}`) return `ln|${variable}| + C`;

  const powerMatch = ex.match(
    new RegExp(`^([+-]?\\d*\\.?\\d*)\\*?${variable}(?:\\^([+-]?\\d*\\.?\\d+))?$`),
  );

  if (powerMatch) {
    const coeffToken = powerMatch[1];
    const powerToken = powerMatch[2];
    const a = coeffToken === "" || coeffToken === "+" ? 1 : coeffToken === "-" ? -1 : Number(coeffToken);
    const n = powerToken === undefined ? 1 : Number(powerToken);

    if (!Number.isFinite(a) || !Number.isFinite(n)) return null;
    if (Math.abs(n + 1) < 1e-12) return `${pretty(a)}*ln|${variable}| + C`;

    const nextPower = n + 1;
    const nextCoeff = a / nextPower;
    return `${pretty(nextCoeff)}${variable}^${pretty(nextPower)} + C`;
  }

  return null;
}

function parseLinearOrQuadratic(expression, variable) {
  const ex = normalizeExpression(expression).replace(/-/g, "+-");
  const terms = ex.split("+").filter(Boolean);
  let a = 0;
  let b = 0;
  let c = 0;

  function parseCoeff(token) {
    if (token === "" || token === "+") return 1;
    if (token === "-") return -1;
    const value = Number(token);
    return Number.isFinite(value) ? value : null;
  }

  for (const term of terms) {
    const quad = term.match(new RegExp(`^([+-]?\\d*\\.?\\d*)\\*?${variable}\\^2$`));
    if (quad) {
      const coeff = parseCoeff(quad[1]);
      if (coeff === null) return null;
      a += coeff;
      continue;
    }

    const linear = term.match(new RegExp(`^([+-]?\\d*\\.?\\d*)\\*?${variable}$`));
    if (linear) {
      const coeff = parseCoeff(linear[1]);
      if (coeff === null) return null;
      b += coeff;
      continue;
    }

    const constant = Number(term);
    if (!Number.isFinite(constant)) return null;
    c += constant;
  }

  if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return null;
  return { a, b, c };
}

function classifyLimit(left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) return "Limit does not settle to a finite number.";
  if (Math.abs(left - right) < 1e-4) return `Limit exists and is about ${pretty((left + right) / 2)}.`;
  return "Left and right values differ, so the two-sided limit does not exist.";
}

function parsePolynomialTerms(expression, variable) {
  const cleaned = insertSimpleMultiplication(normalizeExpression(expression), variable);
  const safeVariable = escapeRegExp(variable);
  const terms = cleaned.replace(/-/g, "+-").split("+").filter(Boolean);
  const parsedTerms = [];

  function parseCoeff(token) {
    if (token === "" || token === "+") return 1;
    if (token === "-") return -1;
    const value = Number(token);
    return Number.isFinite(value) ? value : null;
  }

  for (const term of terms) {
    const variableTerm = term.match(new RegExp(`^([+-]?\\d*\\.?\\d*)\\*?${safeVariable}(?:\\^([+-]?\\d*\\.?\\d+))?$`));
    if (variableTerm) {
      const coeff = parseCoeff(variableTerm[1]);
      const power = variableTerm[2] === undefined ? 1 : Number(variableTerm[2]);
      if (coeff === null || !Number.isFinite(power)) return null;
      parsedTerms.push({ coeff, power });
      continue;
    }

    const constant = Number(term);
    if (!Number.isFinite(constant)) return null;
    parsedTerms.push({ coeff: constant, power: 0 });
  }

  return parsedTerms.length > 0 ? parsedTerms : null;
}

function formatPolynomialTerm(coeff, power, variable, keepPowerOne = false) {
  const absCoeff = Math.abs(coeff);
  const coeffText = pretty(absCoeff);

  if (power === 0) return coeffText;

  const showCoeff = Math.abs(absCoeff - 1) > 1e-12;
  const variablePart = keepPowerOne || power !== 1 ? `${variable}^${pretty(power)}` : variable;
  return `${showCoeff ? coeffText : ""}${variablePart}`;
}

function formatPolynomialExpression(terms, variable, options = {}) {
  const { keepPowerOne = false, includeZeroTerms = false } = options;
  const filtered = includeZeroTerms ? terms : terms.filter((term) => Math.abs(term.coeff) > 1e-12);
  if (filtered.length === 0) return "0";

  return filtered
    .map((term, index) => {
      const sign = term.coeff < 0 ? "-" : index === 0 ? "" : "+";
      const body = Math.abs(term.coeff) < 1e-12 ? "0" : formatPolynomialTerm(term.coeff, term.power, variable, keepPowerOne);
      return `${sign}${body}`;
    })
    .join(" ");
}

function buildPolynomialDerivativeWalkthrough(expression, variable) {
  const terms = parsePolynomialTerms(expression, variable);
  if (!terms) return null;

  const unsimplified = [];
  const simplified = [];
  const steps = [`Use sum rule: differentiate each term in ${expression} separately.`];

  terms.forEach((term) => {
    const original = formatPolynomialExpression([term], variable, { keepPowerOne: true, includeZeroTerms: true });
    if (term.power === 0) {
      steps.push(`d/d${variable}(${original}) = 0 (constant rule).`);
      unsimplified.push({ coeff: 0, power: 0 });
      return;
    }

    const nextCoeff = term.coeff * term.power;
    const nextPower = term.power - 1;
    unsimplified.push({ coeff: nextCoeff, power: nextPower });

    const transformed = `${pretty(term.coeff)}*${pretty(term.power)}${variable}^${pretty(term.power - 1)}`;
    const reduced = formatPolynomialExpression([{ coeff: nextCoeff, power: nextPower }], variable, {
      keepPowerOne: true,
      includeZeroTerms: true,
    });
    steps.push(`d/d${variable}(${original}) = ${transformed} = ${reduced}.`);

    if (Math.abs(nextCoeff) > 1e-12) simplified.push({ coeff: nextCoeff, power: nextPower });
  });

  const unsimplifiedExpr = formatPolynomialExpression(unsimplified, variable, { keepPowerOne: true, includeZeroTerms: true });
  const simplifiedExpr = formatPolynomialExpression(simplified, variable, { keepPowerOne: false, includeZeroTerms: false });

  if (unsimplifiedExpr !== simplifiedExpr) {
    steps.push(`Combine terms: f'(${variable}) = ${unsimplifiedExpr}.`);
    steps.push(`Simplify powers/constants: f'(${variable}) = ${simplifiedExpr}.`);
  } else {
    steps.push(`Combine terms: f'(${variable}) = ${simplifiedExpr}.`);
  }

  return { simplifiedExpr, steps };
}

function App() {
  const [expression, setExpression] = useState("x^3 - 4*x + 1");
  const [variable, setVariable] = useState("x");
  const [point, setPoint] = useState("2");
  const [lowerBound, setLowerBound] = useState("0");
  const [upperBound, setUpperBound] = useState("3");
  const [rootGuess, setRootGuess] = useState("1");
  const [tolerance, setTolerance] = useState("0.000001");
  const [iterations, setIterations] = useState("12");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const engine = useMemo(() => {
    try {
      return compileExpression(expression, variable.trim() || "x");
    } catch {
      return null;
    }
  }, [expression, variable]);

  function runAction(action) {
    try {
      setError("");
      const activeVariable = variable.trim() || "x";
      const fn = compileExpression(expression, activeVariable);
      const p = toNumber(point);
      const a = toNumber(lowerBound);
      const b = toNumber(upperBound);
      const guess = toNumber(rootGuess);
      const eps = toNumber(tolerance) ?? 1e-6;
      const maxIter = Math.max(1, Math.floor(toNumber(iterations) ?? 10));

      if (action === "evaluate") {
        if (p === null) throw new Error("Enter a valid x value.");
        const value = fn(p);
        setResult({
          title: "Function Evaluation",
          lines: [`f(${p}) = ${pretty(value)}`],
          steps: [
            `Use f(${activeVariable}) = ${expression}.`,
            `Substitute ${activeVariable} = ${pretty(p)}.`,
            `Simplify numerically to get ${pretty(value)}.`,
          ],
        });
        return;
      }

      if (action === "derivative") {
        const symbolic = buildPolynomialDerivativeWalkthrough(expression, activeVariable);

        if (symbolic) {
          const lines = [`Symbolic derivative: f'(${activeVariable}) = ${symbolic.simplifiedExpr}`];
          const steps = [...symbolic.steps];

          if (p !== null) {
            const h = 1e-5;
            const fxPlus = fn(p + h);
            const fxMinus = fn(p - h);
            const slope = (fxPlus - fxMinus) / (2 * h);
            lines.push(`At ${activeVariable}=${pretty(p)}, f'(${pretty(p)}) is about ${pretty(slope)}.`);
            steps.push(`Numeric check at ${activeVariable}=${pretty(p)}: f'(${pretty(p)}) ~ ${pretty(slope)}.`);
          }

          setResult({
            title: "Derivative",
            lines,
            steps,
          });
          return;
        }

        if (p === null) throw new Error("Enter a valid point for derivative.");
        const h = 1e-5;
        const fxPlus = fn(p + h);
        const fxMinus = fn(p - h);
        const slope = (fxPlus - fxMinus) / (2 * h);
        setResult({
          title: "Derivative",
          lines: [`Approximate f'(${p}) = ${pretty(slope)}`],
          steps: [
            `Choose h = ${h}.`,
            `Compute f(${pretty(p + h)}) = ${pretty(fxPlus)}.`,
            `Compute f(${pretty(p - h)}) = ${pretty(fxMinus)}.`,
            `Use f'(${pretty(p)}) ~ [f(x+h)-f(x-h)] / (2h).`,
            `Compute (${pretty(fxPlus)} - ${pretty(fxMinus)}) / ${pretty(2 * h)} = ${pretty(slope)}.`,
          ],
        });
        return;
      }

      if (action === "antiderivative") {
        const hint = antiderivativeHint(expression, activeVariable);
        setResult({
          title: "Antiderivative",
          lines: hint
            ? [`Suggested antiderivative: ${hint}`]
            : [
                "No reliable closed-form rule matched this expression.",
                "Tip: use Definite Integral for high-accuracy numeric results.",
              ],
          steps: hint
            ? [
                "Identify the matching rule (power, trig, exponential, or 1/x).",
                "Apply the rule to the expression.",
                `Add + C to get: ${hint}.`,
              ]
            : [
                "Expression is outside the app's safe symbolic rule set.",
                "Switch to numeric integration for this function.",
                "Use Definite Integral with bounds [a, b].",
              ],
        });
        return;
      }

      if (action === "integral") {
        if (a === null || b === null) throw new Error("Enter valid lower and upper bounds.");
        const slices = 400;
        const n = slices % 2 === 0 ? slices : slices + 1;
        const h = (b - a) / n;
        const fA = fn(a);
        const fB = fn(b);
        const oddX = a + h;
        const evenX = a + 2 * h;
        const oddY = fn(oddX);
        const evenY = fn(evenX);
        const area = simpsonIntegral(fn, a, b, slices);
        setResult({
          title: "Definite Integral",
          lines: [`Integral from ${a} to ${b} is approximately ${pretty(area)}.`],
          steps: [
            `Set bounds to [${pretty(a)}, ${pretty(b)}].`,
            `Choose n = ${n} (even), then h = (b-a)/n = ${pretty(h)}.`,
            `Endpoints: f(a) = ${pretty(fA)}, f(b) = ${pretty(fB)}.`,
            `Sample odd term: f(${pretty(oddX)}) = ${pretty(oddY)}.`,
            `Sample even term: f(${pretty(evenX)}) = ${pretty(evenY)}.`,
            "Apply Simpson: Integral ~ (h/3)[f(a)+f(b)+4(sum odd)+2(sum even)].",
            `Final approximation = ${pretty(area)}.`,
          ],
        });
        return;
      }

      if (action === "limit") {
        if (p === null) throw new Error("Enter a point for the limit.");

        const approachSteps = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6];
        const leftValues = approachSteps.map((h) => fn(p - h));
        const rightValues = approachSteps.map((h) => fn(p + h));
        const left = leftValues[leftValues.length - 1];
        const right = rightValues[rightValues.length - 1];
        const conclusion = classifyLimit(left, right);

        setResult({
          title: "Limit",
          lines: [
            `Left estimate near ${p}: ${pretty(left)}`,
            `Right estimate near ${p}: ${pretty(right)}`,
            conclusion,
          ],
          steps: [
            `Choose values approaching ${pretty(p)} from both sides.`,
            ...approachSteps.slice(0, 4).map(
              (h) =>
                `For h=${h}, left uses x=${pretty(p - h)} (value ${pretty(fn(p - h))}), right uses x=${pretty(p + h)} (value ${pretty(fn(p + h))}).`,
            ),
            `Compare the tightest estimates: left ${pretty(left)} and right ${pretty(right)}.`,
            `Conclusion: ${conclusion}`,
          ],
        });
        return;
      }

      if (action === "tangent") {
        if (p === null) throw new Error("Enter a valid point for tangent line.");
        const y = fn(p);
        const m = centralDerivative(fn, p);
        const intercept = y - m * p;

        setResult({
          title: "Tangent Line",
          lines: [
            `Point on curve: (${pretty(p)}, ${pretty(y)})`,
            `Slope: ${pretty(m)}`,
            `Line: y = ${pretty(m)}x + ${pretty(intercept)}`,
          ],
          steps: [
            `Evaluate the curve at x=${pretty(p)} to get y=${pretty(y)}.`,
            `Estimate slope m=f'(${pretty(p)}) ~ ${pretty(m)}.`,
            "Use point-slope form y - y1 = m(x - x1).",
            `Substitute (${pretty(p)}, ${pretty(y)}) and simplify to y = ${pretty(m)}x + ${pretty(intercept)}.`,
          ],
        });
        return;
      }

      if (action === "root") {
        const polynomial = parseLinearOrQuadratic(expression, activeVariable);

        if (polynomial && Math.abs(polynomial.a) > 1e-12) {
          const { a: qa, b: qb, c: qc } = polynomial;
          const discriminant = qb * qb - 4 * qa * qc;

          if (discriminant < 0) {
            setResult({
              title: "Quadratic Solve",
              lines: [
                `Equation: ${pretty(qa)}x^2 + ${pretty(qb)}x + ${pretty(qc)} = 0`,
                `Discriminant = ${pretty(discriminant)} (negative). No real roots.`,
              ],
              steps: [
                "Recognize the expression as a quadratic equation ax^2 + bx + c.",
                `Read coefficients: a=${pretty(qa)}, b=${pretty(qb)}, c=${pretty(qc)}.`,
                "Compute D = b^2 - 4ac.",
                `D = ${pretty(discriminant)} < 0, so real-number roots do not exist.`,
              ],
            });
            return;
          }

          const sqrtD = Math.sqrt(discriminant);
          const x1 = (-qb + sqrtD) / (2 * qa);
          const x2 = (-qb - sqrtD) / (2 * qa);
          setResult({
            title: "Quadratic Solve",
            lines: [
              `Equation: ${pretty(qa)}x^2 + ${pretty(qb)}x + ${pretty(qc)} = 0`,
              `Roots: x1 = ${pretty(x1)}, x2 = ${pretty(x2)}`,
            ],
            steps: [
              "Recognize the expression as a quadratic equation ax^2 + bx + c.",
              `Read coefficients: a=${pretty(qa)}, b=${pretty(qb)}, c=${pretty(qc)}.`,
              "Compute D = b^2 - 4ac.",
              `D = ${pretty(discriminant)}, so use x = (-b +/- sqrt(D)) / (2a).`,
              `x1 = (${pretty(-qb)} + ${pretty(sqrtD)}) / ${pretty(2 * qa)} = ${pretty(x1)}.`,
              `x2 = (${pretty(-qb)} - ${pretty(sqrtD)}) / ${pretty(2 * qa)} = ${pretty(x2)}.`,
            ],
          });
          return;
        }

        if (polynomial && Math.abs(polynomial.a) <= 1e-12 && Math.abs(polynomial.b) > 1e-12) {
          const { b: qb, c: qc } = polynomial;
          const root = -qc / qb;
          setResult({
            title: "Linear Solve",
            lines: [`Solution: x = ${pretty(root)}`],
            steps: [
              "Recognize the expression as a linear equation bx + c = 0.",
              `Read coefficients: b=${pretty(qb)}, c=${pretty(qc)}.`,
              `Solve x = -c / b = ${pretty(-qc)} / ${pretty(qb)} = ${pretty(root)}.`,
            ],
          });
          return;
        }

        if (guess === null) throw new Error("Enter a valid starting guess.");
        const history = [];
        let x = guess;

        for (let i = 1; i <= maxIter; i += 1) {
          const fx = fn(x);
          const dfx = centralDerivative(fn, x);
          if (Math.abs(dfx) < 1e-12) throw new Error("Derivative too close to zero during Newton method.");
          const nextX = x - fx / dfx;
          history.push(
            `Iteration ${i}: x_n=${pretty(x)}, f(x_n)=${pretty(fx)}, f'(x_n)=${pretty(dfx)}, x_(n+1)=${pretty(nextX)}.`,
          );

          if (Math.abs(nextX - x) < eps) {
            setResult({
              title: "Root Approximation",
              lines: [`Root near ${pretty(nextX)} found in ${i} steps.`],
              steps: [
                `Start with x0=${pretty(guess)}.`,
                "Apply Newton update x_(n+1)=x_n-f(x_n)/f'(x_n).",
                ...history.slice(0, 8),
                `Stop when |x_(n+1)-x_n| < ${pretty(eps)}.`,
              ],
            });
            return;
          }

          x = nextX;
        }

        setResult({
          title: "Root Approximation",
          lines: [`Stopped after ${maxIter} steps. Last estimate: ${pretty(x)}.`],
          steps: [
            `Start with x0=${pretty(guess)}.`,
            "Apply Newton update repeatedly.",
            ...history.slice(0, 8),
            "Stop because max iterations was reached before tolerance.",
          ],
        });
      }
    } catch (err) {
      setResult(null);
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <main className="calc-page">
      <section className="hero">
        <p className="eyebrow">Calculus Studio</p>
        <h1>Interactive calculus solver</h1>
        <p className="hero-copy">
          Enter your function once, then run derivatives, integrals, limits, tangent lines, and root approximations.
        </p>
      </section>

      <section className="panel">
        <label htmlFor="expression">Function f(x)</label>
        <input
          id="expression"
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
          placeholder="Example: x^2 + sin(x)"
        />

        <div className="grid">
          <div>
            <label htmlFor="variable">Variable</label>
            <input
              id="variable"
              value={variable}
              maxLength={1}
              onChange={(event) => setVariable(event.target.value || "x")}
            />
          </div>

          <div>
            <label htmlFor="point">Point</label>
            <input id="point" value={point} onChange={(event) => setPoint(event.target.value)} />
          </div>

          <div>
            <label htmlFor="lower">Lower Bound</label>
            <input id="lower" value={lowerBound} onChange={(event) => setLowerBound(event.target.value)} />
          </div>

          <div>
            <label htmlFor="upper">Upper Bound</label>
            <input id="upper" value={upperBound} onChange={(event) => setUpperBound(event.target.value)} />
          </div>

          <div>
            <label htmlFor="guess">Root Guess</label>
            <input id="guess" value={rootGuess} onChange={(event) => setRootGuess(event.target.value)} />
          </div>

          <div>
            <label htmlFor="eps">Tolerance</label>
            <input id="eps" value={tolerance} onChange={(event) => setTolerance(event.target.value)} />
          </div>
        </div>

        <div className="grid single">
          <div>
            <label htmlFor="iter">Max Iterations</label>
            <input id="iter" value={iterations} onChange={(event) => setIterations(event.target.value)} />
          </div>
        </div>

        <div className="buttons">
          <button type="button" onClick={() => runAction("evaluate")}>
            Evaluate
          </button>
          <button type="button" onClick={() => runAction("derivative")}>
            Derivative
          </button>
          <button type="button" onClick={() => runAction("antiderivative")}>
            Antiderivative
          </button>
          <button type="button" onClick={() => runAction("integral")}>
            Definite Integral
          </button>
          <button type="button" onClick={() => runAction("limit")}>
            Limit
          </button>
          <button type="button" onClick={() => runAction("tangent")}>
            Tangent Line
          </button>
          <button type="button" onClick={() => runAction("root")}>
            Solve f(x)=0
          </button>
        </div>

        {!engine && <p className="status error">Expression parser is invalid. Check operators and spelling.</p>}
        {error && <p className="status error">{error}</p>}

        {result && (
          <article className="result">
            <h2>{result.title}</h2>
            {result.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {result.steps && result.steps.length > 0 && (
              <>
                <h3>How It Was Solved</h3>
                <ol className="steps-list">
                  {result.steps.map((step, index) => (
                    <li key={`${step}-${index}`}>{step}</li>
                  ))}
                </ol>
              </>
            )}
          </article>
        )}
      </section>
    </main>
  );
}

export default App;






import {mkdirSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const sampleRate = 48_000;
const duration = 15;
const sampleCount = sampleRate * duration;
const left = new Float32Array(sampleCount);
const right = new Float32Array(sampleCount);

let randomState = 0x4e45584f;
const random = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 0xffffffff;
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const envelope = (time, start, length, attack = 0.04, release = 0.3) => {
  const local = time - start;
  if (local < 0 || local > length) return 0;
  const fadeIn = clamp(local / attack, 0, 1);
  const fadeOut = clamp((length - local) / release, 0, 1);
  return Math.sin((Math.PI / 2) * fadeIn) * Math.sin((Math.PI / 2) * fadeOut);
};

const panGains = (pan) => {
  const angle = ((clamp(pan, -1, 1) + 1) * Math.PI) / 4;
  return [Math.cos(angle), Math.sin(angle)];
};

const addTone = ({start, length, frequency, gain, pan = 0, glide = 0, harmonics = [1]}) => {
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(sampleCount, Math.ceil((start + length) * sampleRate));
  const [leftGain, rightGain] = panGains(pan);
  let phase = 0;

  for (let i = first; i < last; i++) {
    const time = i / sampleRate;
    const local = time - start;
    const progress = local / length;
    const currentFrequency = frequency * (1 + glide * progress);
    phase += (2 * Math.PI * currentFrequency) / sampleRate;
    const amplitude = gain * envelope(time, start, length);
    let value = 0;
    let weight = 0;

    harmonics.forEach((harmonic, index) => {
      const harmonicWeight = 1 / (index + 1);
      value += Math.sin(phase * harmonic) * harmonicWeight;
      weight += harmonicWeight;
    });

    value = (value / weight) * amplitude;
    left[i] += value * leftGain;
    right[i] += value * rightGain;
  }
};

const addWhoosh = ({start, length, gain, pan = 0, rising = true}) => {
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(sampleCount, Math.ceil((start + length) * sampleRate));
  const [leftGain, rightGain] = panGains(pan);
  let filtered = 0;
  let phase = 0;

  for (let i = first; i < last; i++) {
    const time = i / sampleRate;
    const progress = (time - start) / length;
    const shapedProgress = rising ? progress : 1 - progress;
    const cutoff = 0.018 + shapedProgress * 0.18;
    const noise = random() * 2 - 1;
    filtered += cutoff * (noise - filtered);
    phase += (2 * Math.PI * (150 + shapedProgress * 760)) / sampleRate;
    const air = filtered * 0.9 + Math.sin(phase) * 0.1;
    const value = air * gain * envelope(time, start, length, 0.16, 0.24);
    left[i] += value * leftGain;
    right[i] += value * rightGain;
  }
};

const addClick = (time, gain = 0.13, pan = 0) => {
  addTone({start: time, length: 0.085, frequency: 1120, gain, pan, glide: -0.2, harmonics: [1, 2, 3]});
  addWhoosh({start: time, length: 0.05, gain: gain * 0.48, pan, rising: false});
};

const addImpact = (time, gain = 0.2) => {
  addTone({start: time, length: 0.72, frequency: 78, gain, glide: -0.48, harmonics: [1, 2]});
  addWhoosh({start: time - 0.04, length: 0.38, gain: gain * 0.65, rising: false});
};

const addChime = (time, root = 520, gain = 0.11) => {
  [1, 1.25, 1.5].forEach((ratio, index) => {
    addTone({
      start: time + index * 0.09,
      length: 0.72 - index * 0.08,
      frequency: root * ratio,
      gain: gain * (1 - index * 0.14),
      pan: (index - 1) * 0.28,
      glide: 0.025,
      harmonics: [1, 2],
    });
  });
};

// Base ambiente: tecnológica, discreta e original.
for (let i = 0; i < sampleCount; i++) {
  const time = i / sampleRate;
  const intro = clamp(time / 1.4, 0, 1);
  const outro = clamp((duration - time) / 1.1, 0, 1);
  const breathe = 0.82 + Math.sin(time * Math.PI * 0.42) * 0.18;
  const pad =
    Math.sin(2 * Math.PI * 55 * time) * 0.52 +
    Math.sin(2 * Math.PI * 82.5 * time + 0.7) * 0.28 +
    Math.sin(2 * Math.PI * 110 * time + 1.5) * 0.2;
  const shimmer = Math.sin(2 * Math.PI * (330 + Math.sin(time * 0.23) * 9) * time) * 0.007;
  const value = (pad * 0.023 * breathe + shimmer) * intro * outro;
  left[i] += value * (0.96 + Math.sin(time * 0.31) * 0.04);
  right[i] += value * (0.96 - Math.sin(time * 0.31) * 0.04);
}

// Cena 1: entrada da marca e documentos chegando.
addWhoosh({start: 0.08, length: 1.05, gain: 0.12, pan: -0.15});
addChime(0.28, 440, 0.075);
addClick(0.82, 0.11, -0.55);
addClick(1.18, 0.11, 0);
addClick(1.55, 0.11, 0.55);

// Cena 2: documentos convergindo e confirmações de captura.
addWhoosh({start: 3.02, length: 0.72, gain: 0.105, pan: -0.52});
addClick(3.7, 0.13, -0.52);
addWhoosh({start: 3.78, length: 0.72, gain: 0.105, pan: 0});
addClick(4.46, 0.13, 0);
addWhoosh({start: 4.55, length: 0.72, gain: 0.105, pan: 0.52});
addClick(5.23, 0.13, 0.52);
addChime(5.75, 590, 0.09);

// Cena 3: linhas organizadas e estados confirmados.
addWhoosh({start: 7.42, length: 0.7, gain: 0.085, pan: -0.2});
addClick(8.24, 0.12, -0.4);
addClick(9.0, 0.12, 0);
addClick(9.77, 0.12, 0.4);
addChime(10.12, 660, 0.075);

// Encerramento: transição, assinatura da marca e CTA.
addWhoosh({start: 10.78, length: 0.95, gain: 0.14, rising: true});
addImpact(11.03, 0.19);
addChime(11.35, 440, 0.09);
addClick(12.0, 0.09, -0.25);
addClick(12.27, 0.09, 0.25);
addChime(13.32, 700, 0.12);
addImpact(13.36, 0.12);

let peak = 0;
for (let i = 0; i < sampleCount; i++) {
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const normalization = peak > 0 ? 0.88 / peak : 1;

const dataSize = sampleCount * 2 * 2;
const wav = Buffer.alloc(44 + dataSize);
wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write("WAVE", 8);
wav.write("fmt ", 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataSize, 40);

for (let i = 0; i < sampleCount; i++) {
  const offset = 44 + i * 4;
  wav.writeInt16LE(Math.round(clamp(left[i] * normalization, -1, 1) * 32767), offset);
  wav.writeInt16LE(Math.round(clamp(right[i] * normalization, -1, 1) * 32767), offset + 2);
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../public/audio/nexo-soundtrack.wav");
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, wav);
console.log(`Trilha original criada: ${outputPath}`);

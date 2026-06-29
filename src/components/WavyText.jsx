import { motion, useScroll, useTransform } from 'framer-motion';

function WavyChar({ char, index, amplitude, frequency, scrollY }) {
  const y = useTransform(scrollY, v => Math.sin(v * frequency + index * 0.6) * amplitude);
  return (
    <motion.span style={{ y, display: 'inline-block', whiteSpace: 'pre' }}>
      {char}
    </motion.span>
  );
}

export default function WavyText({ text, amplitude = 10, frequency = 0.0042, style = {} }) {
  const { scrollY } = useScroll();
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'nowrap', lineHeight: 'inherit', ...style }}>
      {text.split('').map((char, i) => (
        <WavyChar key={i} char={char} index={i} amplitude={amplitude} frequency={frequency} scrollY={scrollY} />
      ))}
    </span>
  );
}

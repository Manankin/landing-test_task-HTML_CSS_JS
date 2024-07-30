export default function getProgressBar(currentIndex, total, maxWidth) {
  const widthValue = +maxWidth.split('').slice(0, -2).join('');
  return `${Math.round(widthValue / total * (currentIndex + 1))}px`;
}

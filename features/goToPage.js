export default function goToPage(prev, current, next) {
  prev = current;
  current.style.display = 'none';
  next.style.display = 'initial';
  current = next;
}
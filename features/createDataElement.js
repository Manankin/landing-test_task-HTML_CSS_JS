export default function createNewDataElement (key, value) {
  const newElem = document.createElement('div');
  newElem.classList.add('data-flex');

  const newKeyElem = document.createElement('span');
  newKeyElem.classList.add('data-key', 'pt-serif--bold');
  
  const newValueElem = document.createElement('span');
  newValueElem.classList.add('data-value', 'pt-serif--reg');
  
  if (typeof value !== Object && typeof key !== Object) {
    newKeyElem.innerText = key;
    newValueElem.innerText = value;
    newElem.append(newKeyElem, newValueElem);
  }

  return newElem;;
}